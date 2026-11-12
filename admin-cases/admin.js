(function () {
    'use strict';
    const clone = value => JSON.parse(JSON.stringify(value));
    const id = prefix => prefix + '-' + crypto.randomUUID().slice(0, 8);
    const stamp = () => new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
    const fresh = () => clone(window.ADMIN_CASES_SEED);
    const offerIdsFor = work => [...new Set(Array.isArray(work?.offerIds) ? work.offerIds : work?.offerId ? [work.offerId] : [])];
    const assetSrc = source => window.ADMIN_CASES_ASSETS?.[source?.replace(/^\.\//,'')] || source;
    const Thumb = {props:{src:String},methods:{assetSrc},data(){return{failed:false};},watch:{src(){this.failed=false;}},template:'<span class="thumb"><img v-if="src && !failed" :src="assetSrc(src)" alt="素材缩略图" @error="failed=true"><span v-else aria-label="图片待补充">▧</span></span>'};
    const FieldError = {props:{field:String,errors:Object},computed:{errorId(){return 'student-error-'+this.field;}},template:'<div v-if="errors[field]" :id="errorId" class="field-error" role="alert">{{errors[field]}}</div>'};
    const menus = [{id:'students',name:'学员案例管理',icon:'students'},{id:'board',name:'院校录取榜',icon:'board'}];
    Vue.createApp({
        components:{Thumb,FieldError},
        data() {
            // Field validation starts after the first save attempt, then follows live form values.
            const initial={db:fresh(),warning:''};
            return {degreeManager:false,studentSubmitted:false,boardSubmitted:false,degreeSubmitted:false,degreeFilters:{keyword:'',status:''},appliedDegreeFilters:{keyword:'',status:''},degreePage:1,ready:false,storageReady:false,saving:false,db:initial.db,storageWarning:initial.warning,menu:menus,view:menus.some(m=>m.id===location.hash.slice(1))?location.hash.slice(1):'students',role:'admin',openTabIds:['students'],navOpen:false,menuKeyword:'',filters:{keyword:'',category:'',status:'',featured:'',system:'',createdDate:''},appliedFilters:{keyword:'',category:'',status:'',featured:'',system:'',createdDate:''},page:1,boardFilters:{keyword:'',status:''},appliedBoardFilters:{keyword:'',status:''},boardPage:1,department:'fashion',editor:false,editorMode:'edit',form:null,formInitial:'',formError:'',uploading:0,boardLogoError:'',smallForm:null,smallInitial:'',confirmation:null,preview:null,toast:null};
        },
        computed:{
            studentErrors(){return this.editor&&this.editorMode!=='detail'&&this.studentSubmitted&&this.form?Object.fromEntries(this.studentValidation(this.form).map(error=>[error.field,error.message])):{};},
            boardErrors(){if(this.smallForm?.type!=='board'||this.smallForm.readOnly)return {};const errors=this.boardSubmitted?this.boardValidation(this.smallForm):{};if(this.boardLogoError)errors.logo=this.boardLogoError;return errors;},
            admissionsTitle(){return this.db.settings?.admissionsTitle||'录取院校：';},
            canEdit(){return this.ready&&this.storageReady&&!this.saving&&['admin','operator'].includes(this.role);},
            canDelete(){return this.ready&&this.storageReady&&!this.saving&&this.role==='admin';},
            pageName(){return this.menu.find(m=>m.id===this.view)?.name||'学员案例管理';},
            openTabs(){return this.openTabIds.map(id=>this.menu.find(m=>m.id===id)).filter(Boolean);},
            filteredMenus(){const k=this.menuKeyword.trim();return this.menu.filter(item=>!k||item.name.includes(k));},
            activeStudents(){return this.db.students.filter(s=>!s.deletedAt);},
            enabledStudents(){return this.activeStudents.filter(s=>s.enabled);},
            selectedPicks(){return this.db.picks.filter(p=>p.enabled&&this.studentById(p.studentId)&&!this.studentById(p.studentId).deletedAt);},
            filteredStudents(){const f=this.appliedFilters,k=f.keyword.trim().toLowerCase();const rows=this.activeStudents.filter(s=>(!k||s.name.toLowerCase().includes(k))&&(!f.category||s.category===f.category)&&(!f.status||(f.status==='enabled')===s.enabled)&&(!f.featured||(f.featured==='yes')===this.isFeatured(s.id))&&(!f.system||this.db.placements.some(row=>row.studentId===s.id&&this.workFor(row)?.system===f.system))&&(!f.createdDate||String(s.createdAt||'').slice(0,10)===f.createdDate));return rows.sort((a,b)=>b.studentNo-a.studentNo);},
            studentPages(){return Math.max(1,Math.ceil(this.filteredStudents.length/10));},
            visibleStudents(){return this.filteredStudents.slice((this.page-1)*10,this.page*10);},
            effectivePicks(){return this.db.picks.filter(this.isEffective);},
            departmentRows(){return this.placementsForSystem(this.department).filter(row=>{const student=this.studentById(row.studentId);return student&&!student.deletedAt;});},
            sortedBoard(){return [...this.db.board].sort((a,b)=>this.boardValue(b)-this.boardValue(a));},
            filteredBoard(){const f=this.appliedBoardFilters,k=f.keyword.trim().toLowerCase();return this.sortedBoard.filter(b=>(!k||b.school.toLowerCase().includes(k))&&(!f.status||(f.status==='enabled')===b.enabled));},
            effectiveBoard(){return this.sortedBoard.filter(b=>b.enabled);},
            boardPages(){return Math.max(1,Math.ceil(this.filteredBoard.length/10));},
            visibleBoard(){return this.filteredBoard.slice((this.boardPage-1)*10,this.boardPage*10);},
            offerSchoolGroups(){const groups=clone(window.ADMIN_OFFER_OPTIONS?.schoolGroups||[]),known=new Set(groups.flatMap(group=>group.schools));const extra=[];const schools=[...window.ADMIN_CASES_SEED.students,...this.db.students].flatMap(student=>student.offers.map(offer=>offer.school));schools.push(...this.db.board.map(row=>row.school));for(const name of schools){const school=name.trim();if(school&&!known.has(school)){extra.push(school);known.add(school);}}if(extra.length)groups.push({label:'已有案例院校',schools:extra});return groups;},
            enabledDegrees(){return (this.db.degrees||[]).filter(row=>row.enabled);},
            offerDegreeGroups(){return [{label:'学位',options:this.enabledDegrees.map(row=>({value:row.name,label:row.name}))}];},
            degreeErrors(){return this.smallForm?.type==='degree'&&this.degreeSubmitted?this.degreeValidation(this.smallForm):{};},
            filteredDegrees(){const f=this.appliedDegreeFilters,k=f.keyword.trim().toUpperCase();return (this.db.degrees||[]).filter(row=>(!k||row.name.toUpperCase().includes(k))&&(!f.status||(f.status==='enabled')===row.enabled));},
            degreePages(){return Math.max(1,Math.ceil(this.filteredDegrees.length/10));},
            visibleDegrees(){return this.filteredDegrees.slice((this.degreePage-1)*10,this.degreePage*10);},
            applicationSeasons(){return window.OfferFields.seasons;},
            applicationYears(){const years=new Set();for(let year=2000;year<=new Date().getFullYear()+10;year++)years.add(String(year));for(const student of [...this.db.students,...(this.form?[this.form]:[])])for(const offer of student.offers){const year=this.applicationParts(offer.term).year;if(year)years.add(year);}return [...years].sort((a,b)=>Number(b)-Number(a));},
            offerPrograms(){return window.OfferPrograms.entries;},
            previewTitle(){return this.preview?.type==='student'?'学员详情预览':this.preview?.type==='home'?'首页优秀学员预览':this.preview?.type==='department'?'科系案例预览':'分类案例页预览';}
            ,hasOverlay(){return !!(this.editor||this.smallForm||this.preview||this.confirmation||this.degreeManager);}
        },
        watch:{
            studentPages(value){if(this.page>value)this.page=value;},boardPages(value){if(this.boardPage>value)this.boardPage=value;},degreePages(value){if(this.degreePage>value)this.degreePage=value;},
            smallForm(value){if(value){value.revision=this.db.revision;this.smallInitial=JSON.stringify(value);}},
            hasOverlay(value){document.body.style.overflow=value?'hidden':'';}
        },
        methods:{
            openDegrees(){this.resetDegreeFilters();this.degreeManager=true;},
            searchDegrees(){this.appliedDegreeFilters={...this.degreeFilters};this.degreePage=1;},
            resetDegreeFilters(){this.degreeFilters={keyword:'',status:''};this.searchDegrees();},
            degreeValidation(form){const name=form.name.trim(),errors={};if(!name)errors.name='请输入学位名称';else if(name.length>30)errors.name='学位名称最多30字';else if(this.db.degrees.some(row=>row.id!==form.id&&row.name.trim().toUpperCase()===name.toUpperCase()))errors.name='学位名称已存在，请编辑原记录或启用该学位';return errors;},
            editDegree(row){if(!this.guard())return;this.formError='';this.degreeSubmitted=false;this.smallForm={type:'degree',title:row?'编辑学位':'新增学位',id:row?.id||'',name:row?.name||'',enabled:row?.enabled??true};},
            degreeAvailable(offer){return this.enabledDegrees.some(row=>row.name===offer.degree&&(!offer.degreeId||offer.degreeId===row.id));},
            setOfferDegree(offer,name){offer.degree=name;offer.degreeId=this.enabledDegrees.find(row=>row.name===name)?.id||'';},
            toggleDegree(row){
                if(!this.guard())return;const enabled=!row.enabled;
                const apply=async()=>{if(await this.commit(enabled?'启用学位':'停用学位',row.name,db=>{const target=db.degrees.find(item=>item.id===row.id);if(!target||target.enabled!==row.enabled)throw new Error('学位状态已变更，请刷新后重试');target.enabled=enabled;target.updatedAt=stamp();}))this.notify(enabled?'学位已启用':'学位已停用');};
                if(enabled)apply();else this.ask('停用此学位？','停用后，新增和编辑学员的学位选项不再展示此项。已保存的案例内容保留，再次编辑保存时需选择启用中的学位。',apply,{label:'确认停用'});
            },
            offerField(offer,field){return 'offer-'+offer.id+'-'+field;},
            newOffer(){return {id:id('offer'),school:'',programId:'',programEn:'',programZh:'',program:'',degree:'',term:'-AUTUMN',image:''};},
            offerProgram(offer){return String(offer?.programZh||offer?.program||'');},
            setOfferProgram(offer,value){
                if(this.editorMode==='detail'||!this.guard())return;
                const entry=window.OfferPrograms.findEnglish(value);
                offer.programEn=value;offer.programId=entry?.id||'';offer.programZh=entry?.zh||'';offer.program=offer.programZh;
            },
            finishOfferProgram(offer){const entry=window.OfferPrograms.findEnglish(offer.programEn);if(entry&&this.editorMode!=='detail'&&this.canEdit)this.setOfferProgram(offer,entry.en);},
            workCategories(work){return this.db.systems.find(system=>system.id===work.system)?.majors||[];},
            workField(work,field){return 'work-'+work.id+'-'+field;},
            studentFieldAttrs(field){return {'aria-invalid':this.studentErrors[field]?'true':undefined,'aria-describedby':this.studentErrors[field]?'student-error-'+field:undefined};},
            focusStudentError(){this.$nextTick(()=>{const error=document.querySelector('.drawer .field-error');if(!error)return;const field=error.closest('.field')||error.parentElement;field.scrollIntoView({block:'center',behavior:'smooth'});field.querySelector('input:not(:disabled),select:not(:disabled),button:not(:disabled)')?.focus({preventScroll:true});});},
            async initialize(){
                this.ready=false;
                try{this.db=await window.AdminStorage.load(fresh);this.storageWarning='';this.storageReady=true;}
                catch(error){this.storageReady=false;this.storageWarning=window.AdminStorage.message(error);}
                finally{this.ready=true;}
            },
            assetSrc,
            applicationParts(value){return window.OfferFields.termParts(value);},
            applicationSeason(value){return window.OfferFields.seasonValue(value);},
            setApplicationPart(offer,part,value){const parts=this.applicationParts(offer.term);parts[part]=value;offer.term=parts.year||parts.season?parts.year+'-'+parts.season:'';},
            formatOfferTerm(value){return window.OfferFields.formatTerm(value);},
            searchBoard(){this.appliedBoardFilters={...this.boardFilters};this.boardPage=1;},
            resetBoardFilters(){this.boardFilters={keyword:'',status:''};this.searchBoard();},
            boardType(row){return row.metricType||'rate';},
            boardTypeLabel(row){return {rate:'录取率',offerCount:'Offer数量'}[this.boardType(row)]||'未设置';},
            boardValue(row){const value=this.boardType(row)==='offerCount'?row.offerCount:row.rate;return value===''||value==null||!Number.isFinite(Number(value))?-Infinity:Number(value);},
            formatBoardMetric(row){const value=this.boardValue(row);return Number.isFinite(value)?value+(this.boardType(row)==='offerCount'?' 份':'%'):'—';},
            boardFieldAttrs(field){return {'aria-invalid':this.boardErrors[field]?'true':undefined,'aria-describedby':this.boardErrors[field]?'board-error-'+field:undefined};},
            boardValidation(form){
                const errors={},school=form.school.trim(),rate=Number(form.rate),count=Number(form.offerCount);
                if(!school)errors.school='请选择录取院校';
                else if(!this.offerSchoolGroups.some(group=>group.schools.includes(school)))errors.school='请从院校选项中选择';
                else if(this.db.board.some(b=>b.id!==form.id&&b.school.trim().toLowerCase()===school.toLowerCase()))errors.school='此院校已在录取榜中，请修改原记录';
                if(!String(form.logo||'').trim())errors.logo='请上传院校 Logo';
                if(!['rate','offerCount'].includes(form.metricType))errors.metricType='请选择展示类型';
                else if(form.metricType==='rate'&&(form.rate===''||form.rate==null||!Number.isFinite(rate)||rate<0||rate>100||Math.abs(rate*10-Math.round(rate*10))>1e-6))errors.rate='录取率须为 0—100，最多 1 位小数';
                else if(form.metricType==='offerCount'&&(form.offerCount===''||form.offerCount==null||!Number.isSafeInteger(count)||count<0))errors.offerCount='Offer数量须为 0 或正整数';
                return errors;
            },
            roleName(role){return {admin:'管理员',operator:'运营编辑',viewer:'只读用户'}[role]||role;},
            categoryName(category){return this.db.categories.find(c=>c.id===category)?.name||'未设置';},
            systemName(system){return this.db.systems.find(s=>s.id===system)?.name||'科系未设置';},
            studentById(studentId){return this.db.students.find(s=>s.id===studentId);},
            workFor(row){return this.studentById(row.studentId)?.works.find(w=>w.id===row.workId);},
            offerIdsFor,
            offersForWork(student,work){const ids=offerIdsFor(work);return (student?.offers||[]).filter(offer=>ids.includes(offer.id));},
            offersForRow(row){return this.offersForWork(this.studentById(row.studentId),this.workFor(row));},
            offerForRow(row){return this.offersForRow(row)[0];},
            pickCount(studentId){return this.db.picks.filter(p=>p.studentId===studentId&&p.enabled).length;},
            isFeatured(studentId){return this.selectedPicks.some(p=>p.studentId===studentId);},
            featuredRank(studentId){const index=this.selectedPicks.findIndex(p=>p.studentId===studentId);return index<0?0:index+1;},
            writeFeatured(db,studentId,enabled,rank){
                const previous=db.picks.find(p=>p.studentId===studentId);
                db.picks=db.picks.filter(p=>p.studentId!==studentId);
                if(!enabled)return;
                const selected=db.picks.filter(p=>p.enabled&&db.students.some(s=>s.id===p.studentId&&!s.deletedAt));
                const item={id:previous?.id||id('pick'),studentId,enabled:true};
                const next=selected[rank-1],index=next?db.picks.findIndex(p=>p.id===next.id):db.picks.length;
                db.picks.splice(index,0,item);
            },
            async toggleFeatured(s){if(!this.guard())return;const enabled=!this.isFeatured(s.id);if(enabled&&!s.enabled){this.notify('请先启用学员，再设为首页精选',true);return;}if(enabled){const error=this.validateStudent(s);if(error){this.notify(error,true);return;}}if(await this.commit(enabled?'设为首页精选':'取消首页精选',s.name,db=>this.writeFeatured(db,s.id,enabled,this.selectedPicks.length+1)))this.notify(enabled?'已加入首页精选':'已取消首页精选');},
            async moveFeatured(studentId,direction){if(!this.guard())return;const rows=this.selectedPicks,index=rows.findIndex(p=>p.studentId===studentId),target=index+direction;if(index<0||target<0||target>=rows.length)return;await this.commit('调整精选顺序',this.studentById(studentId).name,db=>{const a=db.picks.findIndex(p=>p.id===rows[index].id),b=db.picks.findIndex(p=>p.id===rows[target].id);[db.picks[a],db.picks[b]]=[db.picks[b],db.picks[a]];});},
            placementCount(studentId){return this.db.placements.filter(p=>p.studentId===studentId).length;},
            placementsForSystem(system){return this.db.placements.filter(row=>this.workFor(row)?.system===system).map((row,index)=>({row,order:Number.isInteger(row.order)&&row.order>0?row.order:index+1,index})).sort((a,b)=>a.order-b.order||a.index-b.index).map(item=>item.row);},
            placementOrder(row){const system=this.workFor(row)?.system,rows=this.db.placements.filter(item=>this.workFor(item)?.system===system);return Number.isInteger(row.order)&&row.order>0?row.order:rows.findIndex(item=>item.id===row.id)+1;},
            nextPlacementOrder(system){return Math.max(0,...this.placementsForSystem(system).map(row=>this.placementOrder(row)))+1;},
            openStudentWorks(student){this.canEdit?this.editStudent(student):this.viewStudent(student);this.$nextTick(()=>document.getElementById('student-project-works')?.scrollIntoView({block:'start'}));},
            impactText(studentId){return `影响：分类案例页与学员详情、首页精选 ${this.pickCount(studentId)} 处、科系作品 ${this.placementCount(studentId)} 处。`;},
            isEffective(row){const s=this.studentById(row.studentId),work=this.workFor(row),ids=offerIdsFor(work);return !!(row.enabled&&s&&!s.deletedAt&&s.enabled&&(!row.workId||(work&&ids.length>0&&ids.length<=10&&this.offersForRow(row).length===ids.length)));},
            configReason(row){const s=this.studentById(row.studentId);if(!s||s.deletedAt)return '学员已删除';if(!s.enabled)return '学员已停用';if(!row.enabled)return '展示已关闭';if(row.workId&&(!this.workFor(row)||!offerIdsFor(this.workFor(row)).length||this.offersForRow(row).length!==offerIdsFor(this.workFor(row)).length))return '关联信息缺失';return '生效中';},
            notify(text,error=false){clearTimeout(this.toastTimer);this.toast={text,error};this.toastTimer=setTimeout(()=>{this.toast=null;},4000);},
            guard(destructive=false){if(!(destructive?this.canDelete:this.canEdit)){this.notify('当前角色没有此操作权限',true);return false;}return true;},
            closeTab(view){if(this.openTabIds.length===1)return;const index=this.openTabIds.indexOf(view);this.openTabIds=this.openTabIds.filter(id=>id!==view);if(this.view===view)this.go(this.openTabIds[Math.max(0,index-1)]);},
            async refreshView(){if(this.saving)return;await this.initialize();this.page=1;this.boardPage=1;this.degreePage=1;this.notify(this.storageReady?'已刷新':'读取失败，请检查存储权限',!this.storageReady);},
            go(view){const next=this.menu.some(item=>item.id===view)?view:'students';this.view=next;this.navOpen=false;if(!this.openTabIds.includes(next))this.openTabIds.push(next);location.hash=next;},
            search(){this.appliedFilters={...this.filters};this.page=1;},
            resetFilters(){this.filters={keyword:'',category:'',status:'',featured:'',system:'',createdDate:''};this.search();},
            ask(title,text,action,options={}){this.confirmation={title,text,action,role:this.role,revision:this.db.revision,...options};},
            confirmAction(){const q=this.confirmation;if(!q)return;if(q.role!==this.role||q.revision!==this.db.revision){this.confirmation=null;this.notify('权限或数据已变更，请重新核对后再执行操作',true);return;}this.confirmation=null;q.action();},
            async commit(action,detail,mutate,{destructive=false}={}){
                if(!this.guard(destructive))return false;
                const role=this.role,revision=this.db.revision;
                this.saving=true;
                try {
                    const next=clone(this.db);
                    mutate(next);
                    next.revision=revision+1;
                    next.logs=next.logs||[];
                    next.logs.unshift({id:id('log'),time:stamp(),role,action,detail});
                    next.logs=next.logs.slice(0,100);
                    await window.AdminStorage.write(next,revision,()=>this.role===role&&['admin','operator'].includes(this.role)&&(!destructive||this.role==='admin'));
                    this.db=next;this.storageWarning='';return true;
                }catch(error){
                    if(error.name==='RevisionConflict'){
                        this.db=error.latest;
                        this.notify('其他窗口已更新数据，本次未保存。输入已保留，请重新核对最新资料。',true);
                    }else{this.storageWarning=window.AdminStorage.message(error);if(this.editor||this.smallForm)this.formError=this.storageWarning;this.notify('保存失败，输入内容已保留',true);}
                    return false;
                }finally{this.saving=false;}
            },
            viewStudent(student){this.openStudent(student,'detail');},
            editStudent(student){if(!this.guard())return;this.openStudent(student,'edit');},
            openStudent(student,mode){this.studentSubmitted=false;this.editorMode=mode;this.form=student?clone(student):{id:'',name:'',photo:'',category:'',enabled:true,deletedAt:null,version:0,isDemo:false,offers:[this.newOffer()],works:[{id:id('work'),image:'',caption:'',system:'',major:'',offerIds:[]}]};if(mode!=='detail')this.form.offers.forEach(offer=>{const parts=this.applicationParts(offer.term);if(!parts.season&&(!offer.term||parts.year))offer.term=(parts.year||'')+'-AUTUMN';});const featured=this.isFeatured(student?.id),order=this.featuredRank(student?.id)||this.selectedPicks.length+1;Object.assign(this.form,{homeFeatured:featured,homeOrder:order,homeInitial:JSON.stringify({featured,order}),homeSnapshot:JSON.stringify(this.db.picks),departmentSnapshot:JSON.stringify(this.db.placements)});this.form.works.forEach(work=>{work.major=work.major||'';work.offerIds=offerIdsFor(work);const row=this.db.placements.find(item=>item.studentId===student?.id&&item.workId===work.id);work.displayEnabled=!!row?.enabled;work.displayOrder=row?this.placementOrder(row):this.nextPlacementOrder(work.system);});this.formInitial=JSON.stringify(this.form);this.formError='';this.editor=true;this.$nextTick(()=>this.editorMode==='detail'?document.querySelector('.drawer .close')?.focus():document.getElementById('student-name')?.focus());},
            closeEditor(){if(this.saving){this.notify('正在保存，请稍候',true);return;}if(this.uploading){this.notify('图片正在读取，请稍候',true);return;}if(this.editorMode!=='detail'&&JSON.stringify(this.form)!==this.formInitial){this.ask('放弃未保存的修改？','关闭后，本次输入不会生效。',()=>{this.editor=false;this.form=null;},{danger:true,label:'放弃修改'});}else{this.editor=false;this.form=null;}},
            addOffer(){if(this.editorMode==='detail'||!this.guard())return;if(this.form.offers.length>=10){this.formError='每位学员最多 10 份 Offer';return;}this.form.offers.push(this.newOffer());this.formError='';},
            removeOffer(index){if(this.editorMode==='detail'||!this.guard())return;const offer=this.form.offers[index];if(this.form.offers.length<=1){this.formError='每位学员至少保留一份 Offer';return;}if(this.form.works.some(w=>w.displayEnabled&&offerIdsFor(w).includes(offer.id))){this.formError='这份 Offer 正被科系展示作品引用，请先取消作品中这份 Offer 的勾选，或将科系展示设为“否”，再移除。';return;}this.form.works.forEach(work=>{work.offerIds=offerIdsFor(work).filter(offerId=>offerId!==offer.id);delete work.offerId;});this.form.offers.splice(index,1);this.formError='';},
            addWork(){if(this.editorMode==='detail'||!this.guard())return;if(this.form.works.length>=3){this.formError='每位学员最多 3 张作品';return;}this.form.works.push({id:id('work'),image:'',caption:'',system:'',major:'',offerIds:[],displayEnabled:false,displayOrder:1});},
            workSystemChanged(work){work.major='';work.displayOrder=this.nextPlacementOrder(work.system);this.formError='';},
            toggleWorkDisplay(work){if(this.editorMode==='detail'||!this.guard())return;if(work.displayEnabled){this.ask('确认不在科系页面展示？','保存学员后，此作品将不再展示在科系页面。关联科系、专业分类、排序和图片对应 Offer 将隐藏并保留，不再参与必填校验。学员详情中的作品仍保留。',()=>{work.displayEnabled=false;this.formError='';},{label:'确认不展示'});}else{work.displayEnabled=true;this.formError='';}},
            removeWork(index){if(this.editorMode==='detail'||!this.guard())return;const work=this.form.works[index];if(this.form.works.length<=1){this.formError='每位学员至少保留一张作品';return;}if(work.displayEnabled){this.formError='请先将该作品的“科系展示”设为“否”，再移除作品。';return;}this.form.works.splice(index,1);this.formError='';},
            formMove(list,index,direction){if(this.editorMode==='detail'||!this.guard())return;const target=index+direction;if(target<0||target>=list.length)return;[list[index],list[target]]=[list[target],list[index]];},
            studentValidation(s){
                const errors=[],add=(field,message,prefix='')=>errors.push({field,message,summary:prefix+message});
                if(!s.name.trim())add('name','请填写学员对外展示名称');
                else if(s.name.trim().length>30)add('name','学员对外展示名称最多 30 字');
                if(!this.db.categories.some(c=>c.id===s.category))add('category','请选择一个录取分类');
                if(!s.photo)add('photo','请上传学员照片');
                if(!s.offers.length)add('offers','每位学员至少需要一份完整 Offer');
                else if(s.offers.length>10)add('offers','每位学员最多 10 份 Offer');
                for(const [index,offer] of s.offers.entries()){
                    const field=key=>this.offerField(offer,key),label='Offer '+(index+1)+'：';
                    if(!offer.school.trim())add(field('school'),'请选择录取院校',label);
                    else if(!this.offerSchoolGroups.some(group=>group.schools.includes(offer.school.trim())))add(field('school'),'请从院校选项中选择',label);
                    const program=window.OfferPrograms.findEnglish(offer.programEn);
                    if(!String(offer.programEn||'').trim())add(field('programEn'),'请选择录取专业英文名',label);
                    else if(!program||program.id!==offer.programId)add(field('programEn'),'请从专业库中选择录取专业英文名',label);
                    if(!String(offer.programZh||'').trim())add(field('programZh'),'请选择英文专业以带出中文名称',label);
                    else if(!program||program.zh!==offer.programZh)add(field('programZh'),'专业中英文不匹配，请重新选择英文专业',label);
                    if(!offer.degree.trim())add(field('degree'),'请选择学位',label);
                    else if(!this.degreeAvailable(offer))add(field('degree'),'请重新选择启用中的学位',label);
                    if(!offer.term.trim())add(field('term'),'请选择申请季',label);
                    else if(!this.applicationSeason(offer.term))add(field('term'),'请选择申请季的年份和季度',label);
                    if(!offer.image)add(field('image'),'请上传录取通知图片',label);
                }
                if(!s.works.length)add('works','每位学员至少需要一张作品');
                else if(s.works.length>3)add('works','每位学员最多展示 3 张作品');
                for(const [index,w] of s.works.entries()){
                    const field=key=>this.workField(w,key),label='作品 '+(index+1)+'：';
                    if(!w.image)add(field('image'),'请上传作品图片',label);
                    const placement=this.db.placements.find(row=>row.studentId===s.id&&row.workId===w.id),displayEnabled=w.displayEnabled??placement?.enabled;
                    if(displayEnabled){
                        const offerIds=offerIdsFor(w);
                        if(!offerIds.length)add(field('offerIds'),'请至少选择一份图片对应 Offer',label);
                        else if(offerIds.length>10)add(field('offerIds'),'最多关联 10 份 Offer',label);
                        else if(offerIds.some(offerId=>!s.offers.some(o=>o.id===offerId)))add(field('offerIds'),'作品只能引用当前学员的 Offer');
                        if(!this.db.systems.some(system=>system.id===w.system))add(field('system'),'请选择关联科系',label);else if(w.major&&!this.workCategories(w).includes(w.major))add(field('major'),'请重新选择当前科系的专业分类',label);const order=w.displayOrder??(placement?this.placementOrder(placement):1);if(!Number.isSafeInteger(order)||order<1)add(field('displayOrder'),'展示排序须为正整数',label);
                    }
                }
                if(s.homeFeatured){
                    if(!this.isFeatured(s.id)&&!s.enabled)add('homeFeatured','请先启用学员，再设为首页精选');
                    const rank=Number(s.homeOrder),changed=JSON.stringify({featured:true,order:rank})!==s.homeInitial,maxRank=this.selectedPicks.length+(this.isFeatured(s.id)?0:1);
                    if(changed&&(!Number.isInteger(rank)||rank<1||rank>maxRank))add('homeOrder','精选顺序须为 1—'+maxRank+' 的整数');
                }
                return errors;
            },
            validateStudent(s){return this.studentValidation(s)[0]?.summary||'';},
            async saveStudent(){
                if(!this.guard()||this.uploading||this.editorMode==='detail')return;
                this.studentSubmitted=true;this.formError='';
                const form=clone(this.form);if(this.studentValidation(form).length){this.focusStudentError();return;}
                const featured=!!form.homeFeatured,rank=Number(form.homeOrder),featuredChanged=JSON.stringify({featured,order:rank})!==form.homeInitial;
                if(featuredChanged&&form.homeSnapshot!==JSON.stringify(this.db.picks)){this.formError='首页精选已被其他操作修改，请重新打开档案核对顺序。';return;}
                delete form.homeFeatured;delete form.homeOrder;delete form.homeInitial;delete form.homeSnapshot;
                const original=form.id?this.studentById(form.id):null;
                if(form.id&&(!original||original.deletedAt||original.version!==form.version)){this.formError='此学员已被其他操作修改，请保留输入并重新打开最新档案核对。';return;}
                if(form.departmentSnapshot!==JSON.stringify(this.db.placements)){this.formError='科系展示已被其他操作修改，请重新打开档案核对。';return;}
                const displays=form.works.map(work=>({workId:work.id,system:work.system,enabled:work.displayEnabled,order:work.displayOrder}));delete form.departmentSnapshot;form.works.forEach(work=>{work.offerIds=offerIdsFor(work);delete work.offerId;delete work.displayEnabled;delete work.displayOrder;});
                form.name=form.name.trim();form.offers.forEach(o=>{o.school=o.school.trim();const program=window.OfferPrograms.findEnglish(o.programEn);Object.assign(o,{programId:program.id,programEn:program.en,programZh:program.zh,program:program.zh});o.degree=o.degree.trim();o.degreeId=this.enabledDegrees.find(row=>row.name===o.degree)?.id||'';o.term=this.applicationSeason(o.term);});form.id=form.id||id('student');form.version=(form.version||0)+1;form.updatedAt=stamp();form.createdAt=original?original.createdAt:form.updatedAt;form.studentNo=original?original.studentNo:Math.max(0,...this.db.students.map(student=>student.studentNo||0))+1;
                const summary=original?`保存 ${form.name}；${original.name!==form.name?'展示名称变更；':''}分类 ${this.categoryName(original.category)} → ${this.categoryName(form.category)}；Offer ${original.offers.length} → ${form.offers.length}；作品 ${original.works.length} → ${form.works.length}；${form.enabled?'启用':'停用'}`:`新增 ${form.name} · ${this.categoryName(form.category)} · ${form.enabled?'启用':'停用'}`;
                if(await this.commit(original?'修改学员':'新增学员',summary,db=>{const index=db.students.findIndex(s=>s.id===form.id);if(index<0)db.students.push(form);else db.students[index]=form;if(featuredChanged)this.writeFeatured(db,form.id,featured,rank);db.placements=db.placements.filter(row=>row.studentId!==form.id||displays.some(display=>display.workId===row.workId&&display.system));for(const display of displays){const row=db.placements.find(item=>item.studentId===form.id&&item.workId===display.workId);if(row)Object.assign(row,{enabled:display.enabled,order:display.order});else if(display.enabled)db.placements.push({id:id('placement'),studentId:form.id,workId:display.workId,enabled:true,order:display.order});}})){this.editor=false;this.form=null;this.notify('已保存，关联展示同步生效');}
            },
            toggleStudent(s){if(!this.guard())return;const enabled=!s.enabled;if(enabled){const error=this.validateStudent({...clone(s),enabled:true});if(error){this.notify(error,true);return;}}
                this.ask(enabled?'启用学员案例？':'停用学员案例？',enabled?'学员将恢复公开展示，已开启的首页和科系引用也会恢复。':'停用后，该学员在分类、详情、首页与科系展示中同步隐藏，资料与配置保留。',async()=>{if(await this.commit(enabled?'启用学员':'停用学员',s.name,db=>{const row=db.students.find(x=>x.id===s.id);row.enabled=enabled;row.version++;row.updatedAt=stamp();}))this.notify(enabled?'学员已启用':'学员已停用');},{impact:this.impactText(s.id),label:enabled?'确认启用':'确认停用'});
            },
            async upload(event,target,key){
                const file=event.target.files?.[0];if(!file)return;
                if(!this.guard()){event.target.value='';return;}
                if(this.uploading){event.target.value='';return;}
                const boardLogo=target===this.smallForm&&target.type==='board'&&key==='logo',role=this.role;
                const showError=message=>{if(boardLogo)this.boardLogoError=message;else this.formError=message;};
                if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){showError('请选择 JPG、PNG 或 WebP 图片，单张不超过 5 MB');event.target.value='';return;}
                if(boardLogo)this.boardLogoError='';
                this.uploading++;
                try{
                    const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
                    const image=await new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src;});
                    let optimized=src;
                    if(Math.max(image.naturalWidth,image.naturalHeight)>2560||file.size>1024*1024){
                        const scale=Math.min(1,2560/Math.max(image.naturalWidth,image.naturalHeight));
                        const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
                        canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
                        const compressed=canvas.toDataURL('image/webp',.92);
                        if(compressed.length<src.length)optimized=compressed;
                        canvas.width=canvas.height=0;
                    }
                    if(this.role!==role||!['admin','operator'].includes(this.role)){showError('权限已变更，图片未替换，请重新操作。');return;}
                    target[key]=optimized;if(boardLogo)this.boardLogoError='';else this.formError='';
                }catch{showError('图片读取失败，原图片已保留，请重新选择。');}finally{this.uploading--;event.target.value='';}
            },
            editTitle(){if(!this.guard())return;this.formError='';this.smallForm={type:'title',title:'录取信息标题设置',admissionsTitle:this.admissionsTitle};},
            viewBoard(row){this.editBoard(row,true);},
            editBoard(row,readOnly=false){if(!readOnly&&!this.guard())return;this.formError='';this.boardSubmitted=false;this.boardLogoError='';this.smallForm={type:'board',readOnly,title:readOnly?'录取榜院校详情':row?'修改录取榜院校':'新增录取榜院校',id:row?.id||'',school:row?.school||'',logo:row?.logo||'',metricType:row?this.boardType(row):'rate',rate:row?.rate??'',offerCount:row?.offerCount??'',enabled:row?.enabled??true};},
            boardSchoolChanged(){if(!this.guard()||this.smallForm?.type!=='board'||this.smallForm.readOnly||this.uploading)return;this.smallForm.logo='';this.boardLogoError='';},
            removeBoardLogo(){if(!this.guard()||this.smallForm?.type!=='board'||this.smallForm.readOnly||this.uploading)return;this.smallForm.logo='';this.boardLogoError='';},
            closeSmallForm(){if(this.saving){this.notify('正在保存，请稍候',true);return;}if(this.uploading){this.notify('图片正在读取，请稍候',true);return;}if(this.smallForm&&JSON.stringify(this.smallForm)!==this.smallInitial){this.ask('放弃未保存的修改？','关闭后，本次配置输入不会生效。',()=>{this.smallForm=null;this.formError='';},{label:'放弃修改',danger:true});}else{this.smallForm=null;this.formError='';}},
            async saveSmallForm(){
                if(!this.guard()||this.uploading||this.smallForm.readOnly)return;const f=clone(this.smallForm);this.formError='';
                if(f.revision!==undefined&&f.revision!==this.db.revision){this.formError='配置已被其他操作修改，请重新打开此表单核对最新内容。';return;}
                if(f.type==='degree'){
                    this.degreeSubmitted=true;
                    if(Object.keys(this.degreeValidation(f)).length){this.$nextTick(()=>document.getElementById('degree-name')?.focus());return;}
                    const name=f.name.trim().toUpperCase(),original=this.db.degrees.find(row=>row.id===f.id);
                    if(f.id&&!original){this.formError='学位记录已变更，请重新打开列表核对';return;}
                    if(await this.commit(f.id?'编辑学位':'新增学位',name,db=>{
                        const time=stamp(),index=db.degrees.findIndex(row=>row.id===f.id),previous=index<0?null:db.degrees[index];
                        const row={...(previous||{id:id('degree'),createdAt:time}),name,enabled:f.enabled,updatedAt:time};
                        if(index<0)db.degrees.push(row);else db.degrees[index]=row;
                        if(previous&&previous.name!==name)for(const student of db.students){let changed=false;for(const offer of student.offers){if(offer.degreeId===row.id||(!offer.degreeId&&offer.degree===previous.name)){offer.degree=name;offer.degreeId=row.id;changed=true;}}if(changed){student.version=(student.version||0)+1;student.updatedAt=time;}}
                    })){this.smallForm=null;this.notify('学位已保存');}return;
                }
                if(f.type==='title'){
                    const title=f.admissionsTitle.trim();
                    if(!title||title.length>30){this.formError='请填写录取信息标题，最多 30 字';return;}
                    if(await this.commit('修改录取信息标题',title,db=>{db.settings={...db.settings,admissionsTitle:title};})){this.smallForm=null;this.notify('标题已保存');}return;
                }
                if(f.type==='board'){
                    this.boardSubmitted=true;
                    if(Object.keys(this.boardErrors).length){this.$nextTick(()=>document.querySelector('.modal [aria-invalid="true"]')?.focus());return;}
                    const school=f.school.trim(),metricType=f.metricType,value=this.boardValue(f);
                    if(f.id&&!this.db.board.some(row=>row.id===f.id)){this.formError='该院校记录已变更，请重新打开列表核对';return;}
                    if(await this.commit(f.id?'修改录取榜':'新增录取榜',`${school} · ${this.boardTypeLabel(f)} ${this.formatBoardMetric(f)}`,db=>{const index=db.board.findIndex(b=>b.id===f.id),time=stamp(),row={...(index<0?{createdAt:time}:db.board[index]),id:f.id||id('board'),school,logo:f.logo,metricType,[metricType==='offerCount'?'offerCount':'rate']:value,enabled:f.enabled,updatedAt:time};if(index<0)db.board.push(row);else db.board[index]=row;})){this.smallForm=null;this.notify('录取榜已更新');}return;
                }
            },
            toggleConfig(collection,row){if(!this.guard())return;const enabled=!row.enabled;if(collection!=='board'&&enabled){const s=this.studentById(row.studentId);if(!s||s.deletedAt||!s.enabled){this.notify('学员已停用或删除，请先恢复学员再启用展示',true);return;}}
                const apply=async()=>{if(await this.commit((enabled?'启用':'停用')+({picks:'首页精选',board:'录取榜院校',placements:'科系作品'}[collection]),row.school||this.studentById(row.studentId)?.name||row.id,db=>{const target=db[collection].find(x=>x.id===row.id);target.enabled=enabled;if(collection==='board')target.updatedAt=stamp();}))this.notify('展示状态已更新');};if(!enabled)this.ask('停用此'+(collection==='board'?'院校':'展示')+'？','停用后将在对应前端位置隐藏，资料继续保留。',apply,{label:'确认停用'});else apply();
            },
            previewStudent(student,unsaved=false){if(!student)return;this.preview={type:'student',student:clone(student),unsaved};},
            openPreview(type){this.preview={type,category:this.appliedFilters.category||'offer'};},
            resetDemo(){if(!this.guard(true))return;this.ask('重置本地演示数据？','会清除本原型已保存的修改和上传图片，恢复初始样例。官网文件不受影响。',async()=>{if(await this.commit('重置演示数据','恢复初始样例',db=>{const revision=db.revision;Object.assign(db,fresh(),{revision});},{destructive:true,reset:true})){this.resetFilters();this.notify('已恢复演示数据');}},{danger:true,label:'重置演示数据'});},
            async syncStorage(){try{const latest=await window.AdminStorage.read();if(latest&&latest.revision>this.db.revision){this.db=latest;this.notify(this.editor||this.smallForm?'其他窗口已更新数据，当前表单保存时将检查版本冲突。':'其他窗口数据已同步');}}catch(error){this.storageWarning=window.AdminStorage.message(error);}},
            onStorage(event){if(event.key===window.AdminStorage.signalKey)this.syncStorage();},
            onKey(event){if(event.key==='Escape'){if(this.confirmation)this.confirmation=null;else if(this.preview)this.preview=null;else if(this.smallForm)this.closeSmallForm();else if(this.editor)this.closeEditor();else if(this.degreeManager)this.degreeManager=false;}if(event.key==='Tab'&&this.hasOverlay){const dialogs=[...document.querySelectorAll('[role="dialog"], [role="alertdialog"]')];const top=dialogs.at(-1);const focusable=top?[...top.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]')].filter(el=>el.getClientRects().length):[];if(!focusable.length)return;const first=focusable[0],last=focusable.at(-1);if(!top.contains(document.activeElement)||(event.shiftKey&&document.activeElement===first)){event.preventDefault();(event.shiftKey?last:first).focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}},
            onBeforeUnload(event){if(this.saving||(this.editor&&this.editorMode!=='detail'&&this.form&&JSON.stringify(this.form)!==this.formInitial)||(this.smallForm&&JSON.stringify(this.smallForm)!==this.smallInitial)){event.preventDefault();event.returnValue='';}}
        },
        mounted(){this.initialize();this.focusHandler=()=>{if(this.storageReady&&!this.saving)this.syncStorage();};window.addEventListener('focus',this.focusHandler);this.storageHandler=this.onStorage.bind(this);this.keyHandler=this.onKey.bind(this);this.unloadHandler=this.onBeforeUnload.bind(this);window.addEventListener('storage',this.storageHandler);window.addEventListener('keydown',this.keyHandler);window.addEventListener('beforeunload',this.unloadHandler);this.hashHandler=()=>{const name=location.hash.slice(1);this.view=this.menu.some(m=>m.id===name)?name:'students';if(!this.openTabIds.includes(this.view))this.openTabIds.push(this.view);if(name!==this.view)history.replaceState(null,'','#'+this.view);};this.hashHandler();window.addEventListener('hashchange',this.hashHandler);this.disabledObserver=new MutationObserver(()=>{document.querySelectorAll('button:disabled, fieldset:disabled button').forEach(button=>{if(!button.hasAttribute('data-disabled-title')){button.dataset.disabledTitle='';button.dataset.originalTitle=button.getAttribute('title')||'';}button.title=button.dataset.originalTitle||(!this.canEdit?'当前角色没有此操作权限':button.textContent.trim()==='删除'&&!this.canDelete?'仅管理员可删除学员':this.editorMode==='detail'&&button.closest('fieldset')?'查看模式不可修改':'当前条件下不可操作');});document.querySelectorAll('button[data-disabled-title]').forEach(button=>{if(!button.matches(':disabled')){if(button.dataset.originalTitle)button.title=button.dataset.originalTitle;else button.removeAttribute('title');delete button.dataset.disabledTitle;delete button.dataset.originalTitle;}});});this.disabledObserver.observe(document.getElementById('app'),{subtree:true,childList:true,attributes:true,attributeFilter:['disabled']});},
        beforeUnmount(){window.removeEventListener('focus',this.focusHandler);this.disabledObserver?.disconnect();clearTimeout(this.toastTimer);window.removeEventListener('storage',this.storageHandler);window.removeEventListener('keydown',this.keyHandler);window.removeEventListener('beforeunload',this.unloadHandler);window.removeEventListener('hashchange',this.hashHandler);}
    }).mount('#app');
})();

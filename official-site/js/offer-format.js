(function (window) {
    'use strict';
    function monthValue(value) {
        const text=String(value||'').trim();
        return /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(text)?text:'';
    }
    const seasons=[{value:'SPRING',label:'春季'},{value:'SUMMER',label:'夏季'},{value:'AUTUMN',label:'秋季'},{value:'WINTER',label:'冬季'}];
    function termParts(value) {
        const text=String(value||'').trim(),month=monthValue(text);
        if(month){const [year,number]=month.split('-'),m=Number(number);return {year,season:m>=3&&m<=5?'SPRING':m>=6&&m<=8?'SUMMER':m>=9&&m<=11?'AUTUMN':'WINTER'};}
        const historical=text.match(/^([1-9]\d{3})\s*[-/]?\s*(SPRING|SUMMER|AUTUMN|FALL|WINTER)$/i);
        if(historical)return {year:historical[1],season:historical[2].toUpperCase()==='FALL'?'AUTUMN':historical[2].toUpperCase()};
        const chinese=text.match(/^([1-9]\d{3})年(春季|夏季|秋季|冬季)$/);
        if(chinese)return {year:chinese[1],season:seasons.find(s=>s.label===chinese[2]).value};
        // Retain either selection while the other part is still empty.
        const partial=text.match(/^([1-9]\d{3})?-(SPRING|SUMMER|AUTUMN|WINTER)?$/);
        return partial?{year:partial[1]||'',season:partial[2]||''}:{year:'',season:''};
    }
    function seasonValue(value) {
        const {year,season}=termParts(value);
        return year&&season?year+'-'+season:'';
    }
    function formatTerm(value) {
        const text=String(value||'').trim();
        if(!text)return '';
        const {year,season}=termParts(text);
        if(year&&season)return year+'年'+seasons.find(s=>s.value===season).label;
        if(year||season||text==='-')return '';
        // Unknown historical values stay visible without guessing an application season.
        return text;
    }
    function formatTermEnglish(value) {
        const {year,season}=termParts(value);
        return year&&season?year+' '+(season==='AUTUMN'?'FALL':season):'';
    }
    window.OfferFields={seasons,monthValue,termParts,seasonValue,formatTerm,formatTermEnglish};
})(window);

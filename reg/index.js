function checkPhone(phone, rule) {
    const reg = new RegExp(`^\\d{3}${rule}{4}\\d{4}\\b$`);
    // const reg = /^\d{3}[\*|\d]{4}\d{4}\b$/
    return reg.test(phone);
}

function matchId() {
    const str = "140621199601201350";
    const reg = /^(?:\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;
    return str.match(reg);
}
console.log('(?:', matchId());

function matchExec() {
    const text = "我来的时间是20200928";
    const reg = /\d+/g;
    return text.match(reg);
}

function renderTime(data) {
    const reg = /(?<=\}).?(?=\{)/;
    return (item) => Object.values(item).join(data.match(reg));
}

function parseUrl(url) {
    const reg = /([^?&#]+)=([^?&#]+)/g;
    return url.match(reg).reduce((pre, cur) => {
        const [key, value] = cur.split(/=/);
        return {
            ...pre,
            [key]: value,
        };
    }, {});
}

function AmtFilter(value) {
    const val = value.toString().split(".");
    const [integer, decimal] = val;
    const reg = /(?=(\B\d{3})+\b)/g;
    const integertext = integer.replace(reg, ",");
    const result = decimal ? `${integertext}.${decimal}` : integertext;

    return result;
}
const demo = AmtFilter(1221222221)
console.log('demo', demo);

function encryPhone(phone) {
    const reg = /(\d{3})\d+(\d{4})/;
    return phone.replace(reg, "$1****$2");
}

function matchAddressName(data = "../../bbb.js") {
    const reg = /(?<=\/)\w+/g;
    return data.match(reg)[0];
}

function matchAddress(data = "../../bbb.js") {
    const reg = /(?<=\/)[\w\.]+\b/g;
    return data.match(reg)[0];
}

function filterTag(str) {
    const reg = /(<(\/)?[^p|^br|/w]+>)/g;
    return str.replace(reg, "");
}

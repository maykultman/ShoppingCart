var currency = 'MXN'; // predeterminado
function format(amount, decimalCount = 0, decimal = ".", thousands = ","){
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            const negativeSign = amount < 0 ? "-" : "";
            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;
            const price = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            return `$${price} ${currency}`;
        } catch (e) {
            console.log(e)
        }
}
// Template, Render, object => single or collection
function compiled_tmp(tmp, tmpOut, object){
        //Grab the inline template
        const template = document.getElementById(tmp).innerHTML;
        //Compile the template
        const compiled_template = Handlebars.compile(template);
        //Render the data into the template
        const rendered = compiled_template(object);
        //Overwrite the contents of #target with the renderer HTML
        document.getElementById(tmpOut).innerHTML = rendered;
}
// registramos la función para poder utilizarlo en las plantillas de handelbars
Handlebars.registerHelper('formatN', function (price) {
        return format(price, 2);
});
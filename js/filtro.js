var campoFiltro = document.querySelector("#filtrar-tabela");
campoFiltro.addEventListener("input", function(){

    var dadosTr = document.querySelectorAll(".dados__diabeticos");

    if(this.value.length > 0) {
        for(var i = 0; i < dadosTr.length; i++) {
            var tr = dadosTr[i];
            var tdData = tr.querySelector(".info-data");
            var data = tdData.textContent;
            var filtro = data.indexOf(this.value);

            if(filtro != -1) {
                tr.classList.remove("invisivel");
            }else {
                tr.classList.add("invisivel");
            }
        }
    }else {
        for(var i = 0; i < dadosTr.length; i++) {
            var tr = dadosTr[i];
            tr.classList.remove("invisivel");
        }
    }
});
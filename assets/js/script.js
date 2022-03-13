$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault(); 
        let eleccionPokemon = $('#inputPassword1').val();
        $.ajax({
            type:"GET",
            url:"https://pokeapi.co/api/v2/pokemon/" + eleccionPokemon,
            dataType:"json",
            success: function(data) {
            //si todo sale bien, se agrega la funcionalidad aquí
                $('#mostrar').hide();
                if (isNaN(parseInt(eleccionPokemon))) {
                    $('#mostrar').fadeIn(900);
                    $('#nombre-pokemon').text('Hey! Ingrese un número');
                    $('#mostrar img').attr('src','');
                    $('#mostrar img').attr('alt','');
                    $('#peso').text('');
                    $('#pokeStats').text('');

                } else {
                    desplegar(data);                 
                }

            },
            error: function(dataError) {
            //esta función se activa si ocurre algún error durante el proceso
                console.log(dataError);   
            },
            async: true,
            });
    });
});

function desplegar(data) {
    console.log(data);
    $('#mostrar').fadeIn(1000);
    $('#nombre-pokemon').text(data.name);
    $('#mostrar img').attr('src',data.sprites.front_default);
    $('#mostrar img').attr('alt',`Pokemon: ${data.name}`);
    $('#peso').text('Peso: ' + data.weight); 
    canvas(data);
}

function canvas(data) {
    let estadisticas = [];

    data.stats.forEach(function (s) {
        estadisticas.push({
            label: s.stat.name,
            y: s.base_stat
        })
    });

    let config = {
        animationEnabled: true,
        title: {
            text: "Estadísticas"
        },
        axisY: {
            title: "Valor"
        },
        axisX: {
            title: "Estadística"
        },
        data: [
            {
                type: "column",
                dataPoints: estadisticas
            }
        ]
    };

    let chart = new CanvasJS.Chart("pokeStats", config);
    
    chart.render();
}
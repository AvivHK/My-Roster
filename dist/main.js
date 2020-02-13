$('#submitBtn').on('click', () => {
    const input = $('#teamName').val()
    $.get(`/teams/${input}`, function (result) {
        renderer.render(result)
    })
})

$('#dreamTeam').on('click', () => {
    $.get('/dreamTeam', function (result) {
        renderer.render(result)
    })
})


$('div').on('click','.addPlayer', function(){
    const playerFirstName = $(this).data("first")
    const playerLastName = $(this).data("last")
    $.ajax({
        url: `/dreamTeam/${playerLastName}/${playerFirstName}`,
        method: "POST",
        success: function(){
        }
    })
})

$('div').on('click','.deletePlayer', function(){
    const playerFirstName = $(this).data("first")
    const playerLastName = $(this).data("last")
    $.ajax({
        url: `/dreamTeam/${playerLastName}/${playerFirstName}`,
        method: 'DELETE',
        success: function(result){
            renderer.render(result)
        }
    })

})


class Renderer {
    render(data) {
        const source = $("#player-template").html()
        const template = Handlebars.compile(source);
        const newHTML = template({ player: data });
        $('#container').empty();
        $('#container').append(newHTML);
    }
}

const renderer = new Renderer

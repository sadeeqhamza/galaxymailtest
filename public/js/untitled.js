  if (json[i].Owatest === true) {
            $('#' + json[i].id).prop("checked", true);
            $('#' + json[i].id + 'owatestlabel').text("Pass");
            $('#' + json[i].id + 'owatestlabel').addClass("pad green");
            $('#' + json[i].id + 'owatestlabel').addClass("white-text");
        }
        if (json[i].Owatest === false) {
            $('#' + json[i].id + 'owatestlabel').text("Fail");
            $('#' + json[i].id + 'owatestlabel').addClass("red darken-4");
            $('#' + json[i].id + 'owatestlabel').addClass("white-text");
            $('#' + json[i].id + 'server').addClass("pad red lighten-3");
            $('#' + json[i].id + 'server').addClass("white-text");
        }

        <input id="' + json[i].id +
            '"type="checkbox"><label for="' + json[i].id + '"id="' + json[i].id + 'owatestlabel">' + json[i].Owatest + '</label>
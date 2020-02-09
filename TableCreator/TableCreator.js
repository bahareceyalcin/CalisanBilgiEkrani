



(function ($) {

    function renderTable(element, data, columns) {
        var headerRow = $('<tr>').append(
            $('<th>')
        );
        for (var i = 0; i < columns.length; i++) {
            $('<th>').text(columns[i]).appendTo(headerRow);
        }


        var table =
            $('<table class="table table-bordered" border="1">').append(
                $('<thead>').append(
                    headerRow
                )
            );

        table.appendTo($(element));


        $.each(data, function (i, item) {

            function getFirstModal(item) {
                return $('<div class="modals" style="display: none;">').append(
                    $('<a href="#" class="close">').text("x"),
                    $('<p class="phone">').append(
                        $('<a href="tel:' + item.phone + '">').text(item.phone)),
                    $('<div class="modal-bg" style="display: none;">'));
            }
            function getSecondModal(item) {
                return $('<div class="modals"  style="display: none;">').append(
                    $('<a href="#" class="close">').text("x"),
                    $('<p class="title">').text("Kişisel Bilgiler"),
                    $('<div class="contain">').append(
                        $('<div class="row">').append(
                            $('<div class="col-sm">').text("Ad Soyad"),
                            $('<div class="col-sm">').text(item.name)
                        ),
                        $('<div class="row">').append(
                            $('<div class="col-sm">').text("TCKN"),
                            $('<div class="col-sm">').text(item.tckn)
                        ),
                        $('<div class="row">').append(
                            $('<div class="col-sm">').text("Doğum Yeri"),
                            $('<div class="col-sm">').text(item.birthPlace)
                        )),
                    $('<div class="modal-bg" style="display: none;">'));
            }




            $('<tr class="accordion" data-id=' + item.tckn + '>').append(
                $('<button class="btn btn-block btn-sm btn-default">').text('+'),
                $('<td>').text(item.name),
                $('<td>').append($('<a href="#" class="modal-opener" >').text(item.tckn),
                    getFirstModal(item)
                ),
                $('<td>').append($('<a href="#" class="modal-opener">').text(item.phone),
                    getSecondModal(item)
                )
            ).appendTo(table),
                $.each(item.children, function (i, item2) {
                    $('<tr class="fold" data-id=' + item.tckn + ' >').append(
                        $('<td>'),
                        $('<td>').text(item2.name),
                        $('<td>').append($('<a href="#" class="modal-opener">').text(item2.tckn),

                            getFirstModal(item2)
                        ),
                        $('<td>').append($('<a href="#" class="modal-opener">').text(item2.phone),

                            getSecondModal(item2)
                        )
                    ).appendTo(table);
                });
        });

        $('.btn').on('click', function (e) {
            e.preventDefault();
            var a = $(event.target.parentElement).attr("data-id");
            var b = $("tr.fold[data-id='"+ a +"']");
            b.fadeToggle("slow");
        }
        );
        $("a.modal-opener").on('click', function (e) {
            $(e.target).parent().find('.modals').show();
        });
        $("a.close").on('click', function (e) {
            $(".modals").hide();
        });
    }

    $.fn.tableCreator = function (tableData) {
        renderTable(this, tableData.data, tableData.columns);
        return this;
    };

}(jQuery));
function minesweeper() {

var elements = [];
var fields = [];
var allFields = [];

function showField(thisButton) {
  var thisX = Number(thisButton.attr('data-x'));
  var thisY = Number(thisButton.attr('data-y'));
  var button = fields[thisY][thisX];
  var number = Number(button.attr('data-value'));
  thisButton.attr('data-visible', true);
  if (button.attr('data-mine') === 'true') {
    button.text('X');
    alert('KABOOM!');
    allFields.forEach(function(entry) {
      entry.attr('disabled', true);
    });
  }
  else if (number === 0) {
    button.text(number);
    for (var xx = thisX - 1; xx <= thisX + 1; xx++) {
      for (var yy = thisY - 1; yy <= thisY + 1; yy++) {
        if (fields[yy] !== undefined && fields[yy][xx] !== undefined) {
          var innerButton = fields[yy][xx];
          if (innerButton.attr('data-visible') === 'false') {
            showField(innerButton);
          }
        }
      }
    }        
  }
  else {
    button.text(number);
  }
}

var table = $('#board').find('tbody');
for (var y = 0; y < 16; y++) {
  var tr = $('<tr>');
  var row = [];
  for (var x = 0; x < 16; x++) {
    var td = $('<td>');
    var button = $('<button>').text('_').attr('data-value', 0)
     .attr('data-x', x).attr('data-y', y).attr('data-visible', false)
     .attr('data-mine', false)
     .on('click', function() {
       showField($(this));
    });
    td.append(button);
    tr.append(td);
    row.push(button);
    elements.push(button);
    allFields.push(button);
  }
  fields.push(row);
  table.append(tr);
}

// Generate mines
for (var mines = 0; mines < 40; mines++) {
  var random = Math.floor(Math.random() * elements.length);
  var field = elements[random];
  var thisX = Number(field.attr('data-x'));
  var thisY = Number(field.attr('data-y'));
  field.attr('data-mine', true);
  for (var xx = thisX - 1; xx <= thisX + 1; xx++) {
    for (var yy = thisY - 1; yy <= thisY + 1; yy++) {
      if (fields[yy] !== undefined && fields[yy][xx] !== undefined) {
        var innerButton = fields[yy][xx];
        var previous = Number(innerButton.attr('data-value'));
        innerButton.attr('data-value', previous + 1);
      }
    }
  }        
  elements.splice(random, 1);
}

}

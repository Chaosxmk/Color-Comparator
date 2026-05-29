import {Hex2RGB, RGB2Hex} from "./functions.js";

$(window).on('load', () => {
  $('.hex-colors').on('keyup change blur', (event) => {
    const input = $(event.currentTarget);
    const target = $(input.data('target'));
    const paint = $(input.data('paint'));

    let hexValue = input.val().replace(/^#/, '');

    if (hexValue === '') {
      paint.css('background-color', "transparent");
      target.val(null);
      return;
    } else if (hexValue.length !== 3 && hexValue.length !== 6) {
      paint.css('background-color', "transparent");
      target.val(null);
      return;
    }

    let rgbValue = Object.values(Hex2RGB(hexValue)).join(", ");

    input.val(hexValue.toUpperCase());
    target.val(rgbValue);
    paint.css('background-color', `#${hexValue}`);
  });

  $('.rgb-colors').on('keyup change blur', (event) => {
    const input = $(event.currentTarget);
    const target = $(input.data('target'));
    const paint = $(input.data('paint'));

    let rgbValue = input.val().replace(/[^\d,]/g, '');

    if (rgbValue === '') {
      paint.css('background-color', "transparent");
      target.val(null);
      return;
    } else if ((rgbValue.match(/,/g) || []).length !== 2) {
      return;
    }

    let hexValue = RGB2Hex(rgbValue);
    rgbValue = Object.values(Hex2RGB(hexValue)).join(", ");

    input.val(rgbValue);
    target.val(hexValue);
    paint.css('background-color', `#${hexValue}`);
  });
});
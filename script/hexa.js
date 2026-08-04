import {HexA2RGBA, RGBA2HexA} from "./functions.js";

$(window).on('load', () => {
  $('.hex-colors').on('change blur', (event) => {
    const input = $(event.currentTarget);
    const target = $(input.data('target'));
    const paint = $(input.data('paint'));

    let hexValue = input.val().replace(/^#/, '');

    if (hexValue === '') {
      paint.css('background-color', "transparent");
      target.val(null);
      return;
    } else if (hexValue.length !== 3 && hexValue.length !== 4 && hexValue.length !== 6 && hexValue.length !== 8) {
      paint.css('background-color', "transparent");
      target.val(null);
      return;
    }

    let rgbValue = Object.values(HexA2RGBA(hexValue)).join(", ");

    input.val(hexValue.toUpperCase());
    target.val(rgbValue);
    paint.css('background-color', `#${hexValue}`);
  });

  $('.rgb-colors').on('change blur', (event) => {
    const input = $(event.currentTarget);
    const target = $(input.data('target'));
    const paint = $(input.data('paint'));

    let rgbValue = input.val().replace(/[^\d.,]/g, '');

    if (rgbValue === '') {
      paint.css('background-color', "transparent");
      target.val(null);
      return;
    } else if ((rgbValue.match(/,/g) || []).length !== 2 && (rgbValue.match(/,/g) || []).length !== 3) {
      return;
    }

    let hexValue = RGBA2HexA(rgbValue);
    rgbValue = Object.values(HexA2RGBA(hexValue)).join(", ");

    input.val(rgbValue);
    target.val(hexValue);
    paint.css('background-color', `#${hexValue}`);
  });
});
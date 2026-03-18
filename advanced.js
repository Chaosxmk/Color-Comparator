$(window).on('load', () => {
  $('.hex-colors').on('keyup change blur', (event) => {
    const input = $(event.currentTarget);
    const paint = $(input.data('paint'));

    if (input.is('input')) {
      let hexValue = input.val().replace(/^#/, '');

      if (hexValue === '') {
        paint.css('background-color', "transparent");
        return;
      } else if (hexValue.length !== 3 && hexValue.length !== 6) {
        paint.css('background-color', "transparent");
        return;
      }

      input.val(hexValue.toUpperCase());
      paint.css('background-color', `#${hexValue}`);
    } else if (input.is('textarea')) {
      const lines = input.val().split(/\r?\n|\r|\n/g);
      paint.empty();

      for (let raw of lines) {
        let line = raw.trim();
        if (!line) continue;

        if (/rgb\s*\(/i.test(line)) {
          console.log('rgb detected');
          continue;
        }

        line = line.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/);
        if (!line) continue;

        line = line[1].toUpperCase();
        paint.append(`<div style="--color:#${line}"><p class="d-inline-block bg-light bg-opacity-50 m-0 px-2 py-1 rounded">${raw}</p></div>`);
      }
    }
  });

  $('.hex-colors').trigger('blur');
});
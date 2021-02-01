import $ from '@core/DOM';
import { calcDelta, calcSize, toPixels } from '@core/utils';

const resizeHandler = ($root, event) => {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const parentCoords = $parent.getCoords();
    const type = $resizer.dataset.resize;
    const pointerSide = type === 'column' ? 'bottom' : 'right';

    let updatedSize;

    $resizer.injectStyles({ opacity: 1, [pointerSide]: '-5000px' });

    document.onmousemove = e => {
      if (type === 'column') {
        const delta = calcDelta(e.pageX, parentCoords.right);
        updatedSize = toPixels(calcSize(parentCoords.width, delta));
        $resizer.injectStyles({
          right: toPixels(-delta),
        });
      } else {
        const delta = calcDelta(e.pageY, parentCoords.bottom);
        updatedSize = toPixels(calcSize(parentCoords.height, delta));
        $resizer.injectStyles({
          bottom: toPixels(-delta),
        });
      }
    };

    document.onmouseup = () => {
      $resizer.injectStyles({ opacity: 0, bottom: '0px', right: '0px' });

      if (type === 'column') {
        $parent.injectStyles({
          width: updatedSize,
        });

        $root
          .findAll(`[data-column="${$parent.dataset.column}"]`)
          .forEach(columnCell => (columnCell.style.width = updatedSize));
      } else {
        $parent.injectStyles({ height: updatedSize });
      }

      resolve({
        type,
        id: $parent.dataset[type],
        value: updatedSize,
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
};

export default resizeHandler;

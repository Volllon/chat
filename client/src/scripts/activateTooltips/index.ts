import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util.js.map';

export default () => {
  $(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });
}

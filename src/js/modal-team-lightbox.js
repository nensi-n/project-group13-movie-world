import * as basicLightbox from 'basiclightbox';
import teamModalTemp from '../templates/team-modal.hbs';
import { modalTeamOpen } from './refs';

modalTeamOpen.addEventListener('click', onOpenModalTeam);

function onOpenModalTeam(event) {
  // console.log(event);
  const instance = basicLightbox.create(`${teamModalTemp({})}`, {
    onShow: instance => {
      instance.element().querySelector('svg').onclick = instance.close;
    },
  });

  instance.show();
}

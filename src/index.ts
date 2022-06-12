
import m from 'mithril';
import { Othello } from './Othello';

m.route(document.body, '/', {
  '/': Othello,
});

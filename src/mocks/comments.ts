import { CommentType } from '../types';
export const COMMENTS_MOCK: CommentType[] = [
  {
    'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Max',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': true
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'rating': 4
  },
  {
    'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Angelina',
      'avatarUrl': 'img/avatar-angelina.jpg',
      'isPro': false
    },
    'comment': 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    'rating': 3
  },
];

import moment from 'moment';
import { SERVER_URL } from '../config';

export const globalMethods = {
    methods: {
       formatTime (date, format='LT') {
            return moment(date).format(format);
        },
         formatDate (date, format='LLL') {
              return moment(date).format(format);
        },
        getStaticImageUrl(url) {
          return url ? `${SERVER_URL}/${url}` : 'images/no-avatar.png';
        }
    }
}
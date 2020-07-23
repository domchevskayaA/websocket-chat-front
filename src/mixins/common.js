import moment from 'moment';

export const globalMethods = {
    methods: {
       formatTime (date, format='LT') {
            return moment(date).format(format);
        },
        formatDate (date, format='LLL') {
              return moment(date).format(format);
        },
        getStaticImageUrl(url) {
          return url ? `${process.env.VUE_APP_SERVER_HOST}/${url}` : 'images/no-avatar.png';
        },
        debounceFunction(f, ms) {
            let stopInvocation = false;
          
            return function () {
              if (stopInvocation) return;
          
              f.apply(this, arguments);
          
              stopInvocation = true;
          
              setTimeout(() => stopInvocation = false, ms);
            }
        },
    }
}
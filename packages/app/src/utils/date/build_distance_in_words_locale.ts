export function buildDistanceInWordsLocale () {
    // tslint:disable:object-literal-sort-keys
    const distanceInWordsLocale:any = {
      lessThanXSeconds: {
        one: '방금 전',
        other: '방금 전'
      },
  
      xSeconds: {
        one: '방금 전',
        other: '방금 전'
      },
  
      halfAMinute: '방금 전',
  
      lessThanXMinutes: {
        one: '방금 전',
        other: '{{count}}분 미만'
      },
  
      xMinutes: {
        one: '방금 전',
        other: '{{count}}분'
      },
  
      aboutXHours: {
        one: '약 1시간',
        other: '약 {{count}}시간'
      },
  
      xHours: {
        one: '1시간',
        other: '{{count}}시간'
      },
  
      xDays: {
        one: '1일',
        other: '{{count}}일'
      },
  
      aboutXMonths: {
        one: '약 1개월',
        other: '약 {{count}}개월'
      },
  
      xMonths: {
        one: '1개월',
        other: '{{count}}개월'
      },
  
      aboutXYears: {
        one: '약 1년',
        other: '약 {{count}}년'
      },
  
      xYears: {
        one: '1년',
        other: '{{count}}년'
      },
  
      overXYears: {
        one: '1년 이상',
        other: '{{count}}년 이상'
      },
  
      almostXYears: {
        one: '거의 1년',
        other: '거의 {{count}}년'
      }
    }
  

    function localize (token:any, count: any, options: any) {
      options = options || {}
  
      let result = null;
      if (typeof distanceInWordsLocale[token] === 'string') {
        result = distanceInWordsLocale[token]
      } else if (count === 1) {
        result = distanceInWordsLocale[token].one
      } else {
        result = distanceInWordsLocale[token].other.replace('{{count}}', count)
      }
  
      if (options.addSuffix) {
        if (options.comparison > 0) {
          return result + ' 후'
        } else {
          return result + ' 전'
        }
      }
  
      return result
    }
  
    return {
      localize
    }
  }
  
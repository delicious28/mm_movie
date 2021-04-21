import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    commentStars:{
     flexDirection:'row',
    }
  });

function getStar(item,size){

    if(!item.rating){
      return (
        <View key={item.id+"-null"}></View>
      )
    }

    let stars = parseInt(item.rating.star_count);
    let list = [];
    for(let i=0;i<5;i++){

      if(i<stars)
      {
        list.push(<Image key={item.id+'-'+i} source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAvVJREFUSA21lj1oFFEQx2d2jwTydXsRQUEw2BhiIcGgxkSwUbw7gkhCxCpJIXaCjWUKLQWxshbLgPEzZ2NhREGChSjY2BgMoiC3l3gazceO/3fHbi7Z9+7uncnC8ubNm5nf7Oy8t8vU4CXPUg+J+CCt5Y/wEP22DePYOih7edx5CNBzELvJ9UYaidEQmBIyHsGYJyLZQmAL25KpTJFLbZ0LxLSn7CtCf+QAny98toll/8QtqbMbUIVipiZn3AaqbO3BDschjowJMrCBW4FlqqMTrTUUB3AXPfVOxfVmjRWYWt2LqGyzNpxr12R2YNaUOcxCeFgeUXs4rTXWDS7tXaY+Y0CmFmpKjhrXtyywPOk4So7TjzbzKHCSaBEPd5IkHMWDT1lPnNjiv3kqsoJX8QO+i1hYwl0e1dwJNmSRVyy5VB7Gqc0RdngmMo9Sy+0dxujCzzqcKVyngC4hgTWdxfbrgls0509Emx4lT6PkUwC1bT8MEUXW0TtXOO3fUfEjsJpIzusldmYg7lXzbbyKiH4B0FwYcxNYKWXG2w94Din1hEb/OX6lIMhytvCuMk5sH8Ngnv4GAyjNbKVhQ7LIe5LlY1uhKlYMrJT4xBWo6J/B86t33uAlL2jVH+TM8oIugBasDHmUVtDtL3VOdemEPuEf5afJ1gguOTANmhxr6plPVrOpDiZuHIz/Mcm17TbBjWB54HWhs/eZHOvSc8KYuBFMTVS1VHWBA8cYwwzmGmVG8wD+vGoCbE7eDCZDc6ijj+QmFfOHOZ0/jcNhAnve1ycgvdiQ2iNYC5bp9l3E0h0LVjoQguM4+q5huy2rdRwOd0lW1Ck3HbNndqk12R/TQ6EFU7OLpsBva3ipD7wEk/TF7+Ps4ttQHY6c/fUNTz9MwfoIfgK+h/rSyK72PevBDg9EzkJviFZ78fm8wZdpNdJrBCR1n4prPSj9vYrlExVyJOrBgXxA5gt4yqs0lx/gTPFj5FFD4NGlPGf8MZx6acRQfq91Lv8AZLTfj0RLVbcAAAAASUVORK5CYII=',
          width:size,
          height:size
        }} />)
      }
      else
      {
        list.push(<Image key={item.id+'-'+i} source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAtxJREFUSA21l01oE0EUgLv5wdBEGhUhkj9zW8xBAkFs2lIQFIsHDxVFEJocvApePHrQoyCePOUgHgNKL3oS/EHBQ0CopAZyCCFJiSDV1ICQmMRvJBs2252wu00Hhnnz3rz3vTeTnWnn5hy2ZrO5Sf9WLBbnnYRwOXGq1WpJ/K7S1VAodM1JDEdgl8uV1cFyOtmyaBtcKBTcgG9pBEVRVqvV6mltbnW0Dc5kMpcJHtIBFI/Hk9XNLYm2wUTdB2EHNtArloijRbYW1+v142ztDv2IETIcDi9EIpG3Rr1sbqtiKrtpBh0Ft/UjswUGkJVVQELr5XL5qMxu1FsGj77dtDGAbj7v9/uv6+ZTRYVzO8eKRbYxyDktIAfp/0eqWEAXFONI72GUNtZ2Mf5gfRt5zzC2me+hbw8Gg49Ko9HYRXFMGu1wDDUX0CeHE1selarfu8Lh8ANKv82yv/Kls7MAfZzP53Pj75izXuOcCyACs8NMROozu0OhT4V2DBYTnrkUGb1i+0+J+Qxbh129EY1GX2sxJz4nsvnS7XYXMW5rCw46UsgOfUUPFTEnKtYgvDZBr9e7SeWrms7JCHALvytcpQ2j/0TFmjGRSPxqt9uXcBRn7qjh+67T6SybQUVAU7AwJJPJLhV/ELKThm9FVdXfMl8pWDiQ9bLM0YJ+ZdqaqWAcDwJWK5XKSRlcChZ/zrBdEZmjFb3P55MmLgXzq566VVbAJC6NIQUTWJqtgHL+FfqbaQk4Ak9x6nMLPQJ6lk/lImOO/lOSQKpUKplewaYV81SeIJBqDAZgq9/vn+cWukf/I+zAn/V6vTPYXhrXM3cHAgFxE+5rpmAqEts8vtUI2qXfb7Va6VgsVjRG4cJpkcA6fuK/iu96u9vtNj1nUzDbvKQ5A/xMlSkCP0yn0z1NbzayCy+Ai+qf6+wZnTwWZeCvODfod3k7l+LxuOVHA/guSW6QwBqUbWJ8GtN0wj/otREARiWDTAAAAABJRU5ErkJggg==',
          width:size,
          height:size
        }} />);
      }
    }

    return <View style={styles.commentStars}>{list}</View>
  }

  export default getStar;
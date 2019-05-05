function ig_media_preview(base64data) {
  var jpegtpl = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsaGikdKUEmJkFCLy8vQkc/Pj4/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHSkpNCY0PygoP0c/NT9HR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//AABEIABQAKgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AA==",
    t = atob(base64data),
    p = t.slice(3).split(""),
    o = t.substring(0, 3).split("").map(function (e) {
      return e.charCodeAt(0)
    }),
    c = atob(jpegtpl).split("");
  c[162] = String.fromCharCode(o[1]);
  c[160] = String.fromCharCode(o[2]);
  return base64data ? "data:image/jpeg;base64," + btoa(c.concat(p).join("")) : null
}

function render(html, container, caller){
  document.getElementById('social-sidepanel').style.backgroundColor = "#fff";
  OverlayScrollbars(document.getElementById('social-sidepanel'), {
    className : "os-theme-dark",
  });
  var index = parseInt(ls.getItem('currentFreeIndex'));
  var results = JSON.parse(ls.getItem('results'));
  var counters = JSON.parse(ls.getItem('counters'));
  results[index] = {html: html};

  document.getElementById('instagram-container').innerHTML = html;
  if (container !== 'main') {
    $("#backbtn").show();
  }

  index++;
  var currentVal = $(caller).val();
  /*if (currentVal) {
    currentVal = currentVal.replace('Loading... ', 'Get ');
  }*/

  $(caller).val(currentVal);
  $(caller).css('background-color', '#007bff');
  $(caller).find('#loading').remove();
  var doneDate = dayjs(Date.now()).format('YYYY MM-DD HH:mm:ss')
  //<span class="badge">7</span>
  if($(caller).next().hasClass('glyphicon'))$(caller).next().remove();
  $(caller).after('<span style="color:lawngreen;" class="glyphicon glyphicon-ok"></span>');

  var count = 0;
  if (counters[currentVal]) {
    if (counters[currentVal] >= 1) {
      count = counters[currentVal] + 1;
      counters[currentVal]++;
    } else {
      counters[currentVal] = 1;
      count = 1
    }
  } else {
    counters[currentVal] = 1;
    count = 1
  }
  if (count > 0) {
    $(caller).find('span').remove()
    $(caller).append('<span data-toggle="popover" data-trigger="hover" title="Last updated" data-content="' + doneDate + '" style="" class="badge pulse-default etl-badge" >' + count + '</span>');
  }
  var elem = $(caller).find('span');
  $(elem).popover();
  $(caller).removeClass('disabled');
  var optionsEngagement = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#e0c526',
    fillColor: '#e08e0b',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsLikes = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#44ff6e',
    fillColor: '#21c936',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsComments = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#003f7f',
    fillColor: '#5690c9',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsSentiments = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#7f2e29',
    fillColor: '#c9424a',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  engagementData =  $('#sparkline-data').attr('sparkline-data');
  likesData =  $('#sparkline-likes-data').attr('sparkline-data');
  commentsData =  $('#sparkline-comments-data').attr('sparkline-data');
  sentimentData =  $('#sparkline-likes-data').attr('sparkline-data');
  if(engagementData){
    engagementData = engagementData.split(',') || [];
    if(engagementData.length>=1){
      $('#sparkline').sparkline(engagementData, optionsEngagement)
    }
  }
  if(likesData){
    likesData = likesData.split(',') || [];
    if(likesData.length>=1){
      $('#sparkline-likes').sparkline(likesData, optionsLikes)
    }
  }
  if(commentsData){
    commentsData = commentsData.split(',') || [];
    if(commentsData.length>=1){
      $('#sparkline-comments').sparkline(commentsData, optionsComments)
    }
  }
  if(sentimentData){
    sentimentData = sentimentData.split(',') || [];
    if(sentimentData.length>=1){
      $('#sparkline-sentiments').sparkline(sentimentData, optionsSentiments)
    }
  }
  ls.setItem('results',JSON.stringify(results));
  ls.setItem('currentFreeIndex',index.toString());
  ls.setItem('counters',JSON.stringify(counters));
  /*  var myChart = echarts.init(document.getElementById('sparkline'));

    // specify chart configuration item and data
    var option = {
      title: {
        text: 'Engagement activity'
      },
      tooltip: {},
      legend: {
        data:['Engagement']
      },
      xAxis: {
        data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
        name: 'Engagement',
        type: 'bar',
        data: engagementData
      }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);*/
}

function norender(caller){
  closeNav('social-sidepanel');
  console.log('Did not provide all required input data');
  window.alert('please provide all required');
  //var currentVal = $('.disabled').val();
  //if (currentVal) currentVal = currentVal.replace('Loading... ', 'Get ');
  //$('.disabled').val(currentVal);
  $('#loading').remove();
  $(caller).css('background-color', '#007bff');
  //$('.disabled').next().remove();
  $(caller).removeClass('fired');
  //$(caller).removeClass('fired');
  $(caller).removeClass('disabled');
}

function renderFormData(txt){
  console.log('rendering text...')
  var json = JSON.parse(txt);
  if(json.username)document.getElementById('username-input').value = json.username;
  if(json.username)document.getElementById('tag-input').value = json.tag;
  if(json.username)document.getElementById('location-input').value = json.location;
  if(json.username)document.getElementById('search-input').value = json.query;
  if(json.username)document.getElementById('count-input').value = json.count;
  if(json.username)document.getElementById('shortcode-input').value = json.shortcode;
  if(json.seta){
    console.log('set A found');
    document.getElementById('seta').value = json.seta.toString();
  }
  if(json.setb){
    console.log('set B found');
    document.getElementById('setb').value = json.setb.toString();
  }
  console.log(json);
}

function picit(item) {
  var pic = '';
  if (item.thumbnail_src) {
    pic = item.thumbnail_src;
  } else if (item.profile_pic_url) {
    pic = item.profile_pic_url;
  } else if (item.media_preview) {
    pic = item.media_preview;
    pic = ig_media_preview(pic);
  }
  return pic
}

function chartit(container, data){
  var myChart = echarts.init(document.getElementById(container));


  // specify chart configuration item and data
  /*var option = {
    title: {
      top: '20px',
      text: 'Engagement activity'
    },
    tooltip: {},
    legend: {
      data:['Engagement']
    },
    xAxis: {
      data: ["1","2","3","4","5","7"]
    },
    yAxis: {},
    series: [{
      name: 'Engagement',
      type: 'bar',
      data: [1,2,3,4,5,6,7]
    }]
  };*/
  var option = {
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Matcha Latte'],
        [57.1, 78254, 'Milk Tea'],
        [74.4, 41032, 'Cheese Cocoa'],
        [50.1, 12755, 'Cheese Brownie'],
        [89.7, 20145, 'Matcha Cocoa'],
        [68.1, 79146, 'Tea'],
        [19.6, 91852, 'Orange Juice'],
        [10.6, 101852, 'Lemon Juice'],
        [32.7, 20112, 'Walnut Brownie']
      ]
    },
    grid: {containLabel: true},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#D7DA8B', '#E15457']
      }
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
        }
      }
    ]
  };
  // use configuration item and data specified to show chart
  myChart.setOption(option);
}
(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합.
  let currentScene = 0; // 현재 활성화 된 (모니터에 보이는) Scene(scroll-section)
  let enterNewScene = false; //새로운 scene이 시작된 순간

  const sceneInfo = [
    {
      //0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
        //3번째 start , end 객체를 추가하여 애니메이션 구간을 설정한다.
        messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
      },
    },
    {
      //1
      type: "normal",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      //2
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      //3
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
    //현재 위치에서 새로고침할 때 위치를 잡아줌.
  }

  function calcValues(values, currentYOffset) {
    //여기서 values는 opacity값의 시작값과 끝값
    // currentYOffset은 현재 섹션의 스크롤 높이 값
    let rv;
    // 현재 스크롤 섹션에서 스크롤 된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start~end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    // rv return value 약자로 변수 설정함.
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    // objs 와 values의 값은 sceneInfo에서 변수로 받아 놓은 값들이다.
    //objs는 DOM 객체 요소들

    switch (currentScene) {
      case 0:
        // console.log("0 play");
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYOffset
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        break;

      case 1:
        // console.log("1 play");
        break;

      case 2:
        // console.log("2 play");
        break;

      case 3:
        // console.log("3 play");
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    // for (let i = 0; i < currentScene; i++) {
    //   prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    //   //스크롤 될 때마다 scene높이값이 누적되므로 prevScrollHeight를 더해주는거임
    // }

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return; //초기 상태에서 스크롤을 위로 올릴경우 currentScene이 마이너스가 될 수 있으므로 안전장치 걸어두는 게 좋다.(모바일)
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset; //scroll할때마다 yOffset값이 매겨진다.
    scrollLoop();
  });
  // window.addEventListener("DOMContentLoaded", setLayout); //load보다 속도가 빠름, load는 이미지, 영상 파일 다 불러와야 실행되는 반면에 이것은 html 객체들만 다 불러와도 실행이 됨
  window.addEventListener("load", setLayout); //파일이 다 로드되면 레이아웃을 실행해라.
  window.addEventListener("resize", setLayout);

  setLayout();
})();
//즉시호출함수 이렇게 하면 함수가 자동으로 호출이 됨
//즉시호출함수는 지역변수로 활용을 하여 바깥에서 접근하지 못하는 장점이 있다.

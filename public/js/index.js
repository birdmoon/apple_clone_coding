(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합.
  let currentScene = 0; // 현재 활성화 된 (모니터에 보이는) Scene(scroll-section)

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
        messageA_opacity: [0, 1],
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

  function playAnimation() {
    switch (currentScene) {
      case 0:
        console.log("0 play");
        break;

      case 1:
        console.log("1 play");
        break;

      case 2:
        console.log("2 play");
        break;

      case 3:
        console.log("3 play");
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
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; //초기 상태에서 스크롤을 위로 올릴경우 currentScene이 마이너스가 될 수 있으므로 안전장치 걸어두는 게 좋다.(모바일)
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

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

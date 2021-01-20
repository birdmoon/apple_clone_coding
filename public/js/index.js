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
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; //초기 상태에서 스크롤을 위로 올릴경우 currentScene이 마이너스가 될 수 있으므로 안전장치 걸어두는 게 좋다.
      currentScene--;
    }

    console.log(currentScene);
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset; //scroll할때마다 yOffset값이 매겨진다.
    scrollLoop();
  });

  setLayout();
})();
//즉시호출함수 이렇게 하면 함수가 자동으로 호출이 됨
//즉시호출함수는 지역변수로 활용을 하여 바깥에서 접근하지 못하는 장점이 있다.

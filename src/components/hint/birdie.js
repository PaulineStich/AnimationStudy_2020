import React, { useRef, useEffect, useState } from "react"
import { TimelineMax, Sine, Back } from "gsap/dist/gsap"

const animationBird = (
  tl,
  oeil,
  oiseau,
  queue,
  aile,
  pupille,
  bec,
  tete,
  tache
) => {
  tl.fromTo(
    oeil,
    0.1,
    {
      scaleY: 0,
      transformOrigin: "50% 50%",
      ease: Back.easeOut.config(1.7),
    },
    { scaleY: 1 }
  )
    .fromTo(oiseau, 0.5, { y: 0 }, { y: -5, ease: Back.easeOut.config(1.7) })
    .fromTo(
      queue,
      0.3,
      { rotation: "5deg", scale: 0.95, transformOrigin: "100% 90%" },
      { scale: 1, rotation: "15deg" },
      0
    )
    .fromTo(
      aile,
      0.2,
      { rotation: "-5deg", scale: 0.95 },
      { scale: 1, rotation: "-10deg" },
      0
    )
    .to(pupille, 0.2, { y: -5, x: 5, ease: Sine.easeOut })
    .to(pupille, 0.8, { y: -3, x: 7, ease: Sine.easeOut })
    .fromTo(
      bec,
      0.2,
      { rotation: "-15deg", scale: 0.95, transformOrigin: "10% 50%" },
      { scale: 1, rotation: "-8deg" },
      0
    )
    .fromTo(tete, 0.3, { rotation: "1deg" }, { rotation: "0deg" }, 0)
    .staggerTo(tache, 0.25, { opacity: 0.5, ease: Sine.easeOut }, 0.04)
}

const animationBirdRespire = (tl, ventre) => {
  tl.fromTo(ventre, 0.4, { scale: 0.99, ease: Sine.easeOut }, { scale: 0.997 })
}

const Birdie = ({ isShowing, isHovered }) => {
  let oiseau = useRef(null)
  let queue = useRef(null)
  let aile = useRef(null)
  let ventre = useRef(null)
  let patteGauche = useRef(null)
  let patteDroite = useRef(null)
  let taches = useRef(null)
  let bec = useRef(null)
  let tete = useRef(null)
  let oeilContent = useRef(null)
  let oeil = useRef(null)
  let pupille = useRef(null)
  let suprise1 = useRef(null)
  let suprise2 = useRef(null)
  let suprise3 = useRef(null)
  let blah1 = useRef(null)
  let blah2 = useRef(null)

  const [tlBird] = useState(
    new TimelineMax({ repeat: -1, yoyo: true, repeatDelay: 0.4 })
  )
  const [tlBirdRespire] = useState(new TimelineMax({ repeat: -1, yoyo: true }))
  const [tlSupris] = useState(new TimelineMax({ paused: true }))
  const [tlBlahBlah] = useState(new TimelineMax({ paused: true, repeat: 50 }))

  const [hoverSupriseAnimation, setHoverSupriseAnimation] = useState()
  const [clickBlahAnimation, setClickBlahAnimation] = useState()

  useEffect(() => {
    const tache = taches.children
    animationBird(tlBird, oeil, oiseau, queue, aile, pupille, bec, tete, tache)
    animationBirdRespire(tlBirdRespire, ventre)
  }, [
    oeil,
    oiseau,
    queue,
    aile,
    pupille,
    bec,
    tete,
    taches,
    ventre,
    tlBird,
    tlBirdRespire,
  ])

  useEffect(() => {
    setHoverSupriseAnimation(
      tlSupris
        .fromTo(
          suprise1,
          0.2,
          { opacity: 0, scaleY: 0, transformOrigin: "100% 100%" },
          { opacity: 1, scaleY: 0.5 },
          0.1
        )
        .fromTo(
          suprise2,
          0.2,
          { opacity: 0, scaleY: 0, transformOrigin: "100% 100%" },
          { opacity: 1, scaleY: 0.7 },
          0.15
        )
        .fromTo(
          suprise3,
          0.2,
          { opacity: 0, scaleY: 0, transformOrigin: "100% 100%" },
          { opacity: 1, scaleY: 0.6 },
          0.2
        )
        .to(suprise1, 0.2, { opacity: 0, scaleY: 0.6 }, 0.15)
        .to(suprise2, 0.2, { opacity: 0, scaleY: 0.8 }, 0.2)
        .to(suprise3, 0.2, { opacity: 0, scaleY: 0.7 }, 0.25)
    )
  }, [tlSupris])

  useEffect(() => {
    setClickBlahAnimation(
      tlBlahBlah
        .fromTo(
          blah1,
          0.2,
          { opacity: 0, y: 0 },
          { opacity: 1, y: -5, delay: 1 }
        )
        .fromTo(blah2, 0.2, { opacity: 0, y: 0 }, { opacity: 1, y: -5 })
        .to(blah1, 0.2, { opacity: 0, y: -10 })
        .to(blah2, 0.2, { opacity: 0, y: -10 })
    )
  }, [tlBlahBlah])

  useEffect(() => {
    if (clickBlahAnimation !== undefined) {
      isShowing === undefined
        ? clickBlahAnimation.play()
        : clickBlahAnimation.reverse(-1)
    }

    if (hoverSupriseAnimation !== undefined) {
      isHovered
        ? hoverSupriseAnimation.play()
        : hoverSupriseAnimation.reverse(-1)
    }
  }, [isShowing, isHovered, hoverSupriseAnimation, clickBlahAnimation])

  return (
    <div className="bird">
      <div className="blah">
        <h6 ref={el => (blah1 = el)} className="blah-text">
          <em>blah</em>
        </h6>
        <h6 ref={el => (blah2 = el)} className="blah-text">
          <em>blah</em>
        </h6>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 447 498">
        <g transform="matrix(1,0,0,1,-329.312,-718.508)">
          <g id="oiseau-vectoriel" ref={el => (oiseau = el)}>
            <path
              id="queue"
              d="M586.052,1106.45C586.052,1106.45 404.831,959.321 399.608,956.016L395.487,966.5C395.487,966.5 387.779,991.504 387.779,996.847C387.779,1002.19 455.341,1040.92 514.082,1078.01C514.082,1078.01 371.981,1022.78 369.839,1018.94C369.839,1018.94 336.446,1019.7 330,1043.5C330,1043.5 573.417,1124.17 584.355,1133.68L586.052,1106.45Z"
              fill="#657095"
              ref={el => (queue = el)}
            />
            <path
              id="ventre"
              d="M577.938,1144.62C577.938,1144.62 576.795,1108.03 590.175,1084.38C590.175,1084.38 604.324,1046.78 606.654,1039C606.654,1039 626.409,1044.74 628.679,1045.94C635.707,1049.65 744.143,1065.88 745.015,1058.08L762.421,1055.82C762.421,1055.82 765.763,1079.51 765,1084.94C764.237,1090.37 754.531,1106.65 741.252,1121.28C725.649,1138.46 721.505,1142.47 697.501,1158.37C673.498,1174.26 625.831,1162.38 620.174,1161.11C579.964,1152.12 577.938,1144.62 577.938,1144.62Z"
              fill="rgb(253,253,253)"
              ref={el => (ventre = el)}
            />
            <path
              id="aile"
              d="M580.569,1113.03C580.569,1113.03 582.261,1109.65 585.237,1110.93C588.213,1112.2 598.522,1119.7 628.793,1119.56C628.793,1119.56 659.597,1118.56 670.5,1114.07C681.403,1109.58 670.5,1114.07 670.5,1114.07C670.5,1114.07 675.321,1111.49 678.296,1115.11C681.272,1118.73 675.838,1121.92 674.5,1122.19C673.162,1122.46 663.759,1134.67 628.292,1133.05C628.292,1133.05 593.541,1128.91 589.118,1130C589.118,1130 587.071,1129.83 582,1133.42C582,1133.42 578.166,1134.1 577.914,1133.26C577.662,1132.43 575.614,1130.84 575.806,1129.38C576.248,1126.01 580.569,1113.03 580.569,1113.03Z"
              fill="rgb(29,28,28)"
              ref={el => (aile = el)}
            />
            <path
              id="patte-gauche"
              d="M588.745,1153.24L595.53,1155.87C595.53,1155.87 593.049,1167.83 593.049,1168C593.049,1168.17 599.609,1181.23 606.061,1188.47C606.061,1188.47 609.83,1188.39 616.218,1186.14C622.606,1183.89 627.587,1183.58 627.587,1183.58C627.587,1183.58 635.471,1183.74 634.475,1185.91C633.479,1188.08 627.171,1188.54 627.587,1188.54C628.004,1188.54 618.555,1191.53 618.555,1191.53C618.555,1191.53 629.67,1192.74 633.133,1196.49C636.596,1200.24 634.745,1197.21 634.745,1197.21C634.745,1197.21 640.401,1202.59 635.203,1202.53C635.203,1202.53 618.24,1198.33 611.833,1199.09C611.833,1199.09 623.214,1211.82 623.568,1212.59C623.922,1213.37 624.428,1217.09 620.027,1215C615.625,1212.91 610.357,1204.42 599.313,1198.79C588.269,1193.15 591.194,1196.41 591.194,1196.41C591.194,1196.41 591.594,1202.95 589.747,1205.92C589.747,1205.92 586.902,1208.18 586.326,1204.43C586.326,1204.43 584.149,1199.78 586.938,1191.99C589.726,1184.2 586.938,1191.99 586.938,1191.99C586.938,1191.99 585.281,1189.68 599.289,1192.06C599.289,1192.06 583.593,1172.95 583.699,1171.34C583.805,1169.74 583.653,1169.57 583.922,1166.57C584.191,1163.57 588.745,1153.24 588.745,1153.24Z"
              fill="black"
              ref={el => (patteGauche = el)}
            />
            <path
              id="patte-droite"
              d="M690.579,1153.24L696.569,1160.05L700.03,1180.56C700.03,1180.56 707.742,1177.57 712.166,1176.49C716.59,1175.42 724.524,1172.04 726.482,1172.58C728.44,1173.12 728.789,1176.78 726.333,1176.78C723.878,1176.78 706.908,1182.36 706.908,1182.36L725.886,1181.9C725.886,1181.9 732.152,1180.78 733.196,1184.43C734.239,1188.09 731.203,1186 731.203,1186C731.203,1186 728.045,1192.44 714.391,1190.34L702.958,1190.71L715.74,1199.26C715.74,1199.26 720.997,1200.36 720.477,1202.6C720.477,1202.6 718.576,1205.19 714.716,1203.69L693.051,1190.86L690.336,1190.27L688.293,1190.71L686.248,1190.71L685.746,1188.98L680.801,1188.19C680.801,1188.19 678.739,1184.97 681.94,1184.43C685.142,1183.9 690.636,1184.43 690.636,1184.43C690.636,1184.43 687.665,1167.13 688.672,1164.07C689.68,1161.01 687.169,1153.68 690.579,1153.24Z"
              fill="black"
              ref={el => (patteDroite = el)}
            />
            <path
              id="bec"
              d="M736.327,989.31L738.694,972.702C738.694,972.702 764.857,989.936 774,995.833C774.111,995.905 774.227,995.965 774.325,996.045C775.07,996.656 775.404,1000.21 775.404,1000.21L765.113,999.981L736.327,989.31Z"
              fill="rgb(29,28,28)"
              ref={el => (bec = el)}
            />
            <path
              id="tete"
              d="M606.777,1039C606.777,1039 614.038,995.992 621.137,975.696L622.09,968.808C622.09,968.808 632.968,934.075 647.159,931.642L627.292,918.761C627.292,918.761 623.766,915.354 624.99,914.262C626.214,913.171 640.235,910.751 640.235,910.751L660.851,926.626L650.538,896.998C650.538,896.998 647.114,888.085 653.249,890L663.783,893.249C663.783,893.249 666.989,905.556 671.514,927.65C671.514,927.65 678.784,918.625 733.414,934.771C733.414,934.771 736.796,932.932 737.165,950.373L738.694,972.702L738.306,983.175C738.306,983.175 737.752,988.7 740.554,995.495C743.356,1002.29 745.818,1011.11 745.818,1011.11C745.818,1011.11 749.949,1029.1 755.719,1039C758.824,1044.33 762.002,1048.59 762.272,1052.5C762.552,1056.55 765.627,1090.9 738.802,1106.18C711.977,1121.46 738.802,1106.18 738.802,1106.18C738.802,1106.18 716.413,1127.91 687.647,1109.86C687.762,1109.94 674.076,1099.18 670.5,1092.22C670.5,1092.22 654.787,1075.75 652.699,1071.58C652.699,1071.58 636.779,1049.8 631.563,1047.05C631.563,1047.05 609.04,1038.95 606.777,1039Z"
              fill="rgb(29,28,28)"
              ref={el => (tete = el)}
            />
            <path
              id="oeil-content"
              d="M679.187,968.09C679.187,968.09 685.504,954.968 699.878,964.277C699.878,964.277 702.313,968.812 694.531,966C694.531,966 682.66,964.285 682.471,969.116C682.471,969.116 679.702,971.779 679.187,968.09Z"
              fill="rgb(236,236,231)"
              ref={el => (oeilContent = el)}
            />
            <g id="oeil-normal">
              <path
                id="oeil"
                d="M681.898,976.285C681.898,976.285 677.943,969.425 679.917,963.618C679.917,963.618 682.007,953.713 686.683,953.329C691.36,952.946 686.683,953.329 686.683,953.329C686.683,953.329 691.555,950.738 698.613,958.926C698.613,958.926 702.062,962.101 701.168,966.5C701.168,966.5 700.454,974.985 694.545,979.234C694.545,979.234 692.018,981.289 688.704,980.48C688.704,980.48 685.2,979.758 681.898,976.285"
                fill="rgb(249,249,245)"
                ref={el => (oeil = el)}
              />
              <path
                id="pupille"
                d="M686.724,974.025C686.724,974.025 685.211,971.611 685.445,966.804C685.445,966.804 686.233,961.301 688.439,960.655C688.439,960.655 691.93,961.023 693.75,963.996C693.75,963.996 693.797,964.12 693.863,964.345C694.215,965.543 693.879,969.656 692.446,972.931C692.446,972.931 689.883,975.57 686.724,974.025Z"
                fill="rgb(29,28,28)"
                ref={el => (pupille = el)}
              />
            </g>
            <g id="taches" ref={el => (taches = el)}>
              <path
                d="M731.438,1095.39C731.438,1095.39 728.784,1094.82 731.299,1090.21C731.299,1090.21 732.272,1086.77 733.483,1087.69C733.483,1087.69 735.853,1090.8 734.486,1093.53C734.486,1093.53 732.672,1095.59 731.438,1095.39"
                fill="rgb(236,236,231)"
              />
              <path
                d="M735.812,1075.81C735.812,1075.81 739.023,1075.5 738.192,1071.78C738.192,1071.78 738.081,1069.28 734.91,1072.47C734.91,1072.47 733.981,1075.94 735.812,1075.81Z"
                fill="rgb(236,236,231)"
              />
              <path
                d="M737.231,1057.44C737.231,1057.44 735.498,1054.19 738.329,1052.5C738.329,1052.5 740.475,1050.59 740.061,1055.15C740.061,1055.15 737.928,1058.76 737.231,1057.44Z"
                fill="rgb(236,236,231)"
              />
              <path
                d="M751.187,1056.77C751.187,1056.77 748.386,1053.86 751.346,1052.5C751.346,1052.5 753.804,1051.99 753,1055.54C753,1055.54 752.238,1057.5 751.187,1056.77Z"
                fill="rgb(236,236,231)"
              />
              <path
                d="M749.325,1070.85C749.325,1070.85 748.125,1066.59 749.988,1066.93C749.988,1066.93 751.876,1065.97 751.575,1068.57C751.575,1068.57 752.28,1071.45 749.325,1070.85Z"
                fill="rgb(236,236,231)"
              />
              <path
                d="M661,1052.5L661,1051.25C661,1051.25 663.66,1050.83 664.791,1052.5C665.921,1054.17 666.549,1056.15 665.633,1057.67C665.633,1057.67 664.377,1059.92 663.18,1058C663.18,1058 661.321,1055.09 661,1052.5Z"
                fill="rgb(249,249,245)"
              />
              <path
                d="M679.365,1054.14C679.365,1054.14 677.867,1058.36 679.365,1059.63C679.365,1059.63 681.261,1060.19 681.834,1057.97C681.834,1057.97 682.642,1054.19 679.365,1054.14"
                fill="rgb(249,249,245)"
              />
              <path
                d="M671.578,1070.92C671.578,1070.92 671.602,1065.71 675.378,1069.89C675.378,1069.89 676.739,1073.39 675.473,1075.05C675.473,1075.05 673.622,1077.12 672.328,1073.5C672.328,1073.5 671.585,1071.99 671.578,1070.92Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M692.669,1067.01C692.669,1067.01 689.071,1065.16 692.044,1062.02C692.044,1062.02 693.585,1059.58 694.392,1062.52C694.392,1062.52 695.547,1067.64 692.669,1067.01Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M689.687,1084.1C689.687,1084.1 687.971,1083.83 687.971,1081.19C687.971,1081.19 687.454,1078.43 688.72,1078C688.72,1078 690.889,1077.22 690.867,1081.94C690.867,1081.94 691.331,1084.99 689.687,1084.1Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M683.219,1094.52C683.219,1094.52 680.804,1092.95 682.751,1090.88C682.751,1090.88 684.026,1089.41 684.546,1092.11C684.546,1092.11 684.86,1096.36 683.219,1094.52Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M700.791,1048.17C700.791,1048.17 698.239,1048.43 699.206,1052.5C699.206,1052.5 701.155,1054.21 701.491,1052.5C701.491,1052.5 703.598,1047.65 700.791,1048.17Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M707,1067.06C707,1067.06 705.924,1062.73 709.354,1062.95C709.354,1062.95 713.44,1062.37 711.399,1066.76C711.399,1066.76 710.127,1070.39 708.921,1069.71C708.921,1069.71 707.502,1070.14 707,1067.06Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M705.039,1084.26C705.039,1084.26 703.373,1082.4 704.902,1080.07C706.432,1077.75 704.902,1080.07 704.902,1080.07C704.902,1080.07 705.933,1078.2 707,1079.41C708.067,1080.62 707,1079.78 707,1079.78C707,1079.78 709.388,1082.23 706.84,1084.24C706.84,1084.24 706.199,1085.52 705.039,1084.26Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M705.467,1105C705.467,1105 703.782,1103.05 704.256,1099.45C704.256,1099.45 703.621,1096.51 704.951,1096.92C706.282,1097.33 704.951,1096.92 704.951,1096.92C704.951,1096.92 707.203,1098.53 708.016,1101.11C708.829,1103.69 707.198,1106.08 706.136,1105"
                fill="rgb(253,253,253)"
              />
              <path
                d="M721,1048.13C721,1048.13 721.772,1044.97 722.15,1045.02C722.527,1045.06 723.904,1044.27 724.363,1045.3C724.822,1046.33 724.192,1050.31 723.11,1050.7C723.11,1050.7 720.985,1051.65 721,1048.13"
                fill="rgb(253,253,253)"
              />
              <path
                d="M722.757,1066.36C722.757,1066.36 722.391,1061.27 724.515,1061.31C726.638,1061.34 726.882,1060.65 726.415,1063.58C726.415,1063.58 726.144,1067.34 724.515,1066.95C724.515,1066.95 723.026,1067.3 722.757,1066.36Z"
                fill="rgb(253,253,253)"
              />
              <path
                d="M721,1082.83C721,1082.83 717.258,1081.45 720.044,1079C720.044,1079 721.989,1075.99 722.733,1078.5C723.477,1081 722.733,1078.5 722.733,1078.5C722.733,1078.5 723.919,1082.3 721,1082.83"
                fill="rgb(253,253,253)"
              />
              <path
                d="M719.013,1100.1C719.013,1100.1 716.561,1098.75 719.013,1095.97C719.013,1095.97 720.1,1092.43 721.039,1093.87C721.039,1093.87 723.405,1096.41 721.039,1100.46C721.039,1100.46 719.118,1101.23 719.013,1100.1Z"
                fill="rgb(253,253,253)"
              />
            </g>
            <g
              id="suprise1"
              transform="matrix(0.780319,-0.625382,0.625382,0.780319,-367.765,473.203)"
            >
              <rect
                x="485.153"
                y="758.241"
                width="7.076"
                height="104.507"
                fill="rgb(236,236,231)"
                ref={el => (suprise1 = el)}
                opacity="0"
              />
            </g>
            <g
              id="surpise2"
              transform="matrix(1.10929,-0.348839,0.24329,0.773645,-121.115,312.327)"
            >
              <rect
                x="485.153"
                y="758.241"
                width="7.076"
                height="104.507"
                fill="rgb(236,236,231)"
                ref={el => (suprise2 = el)}
                opacity="0"
              />
            </g>
            <g
              id="surprise3"
              transform="matrix(1.1039,0.365527,-0.254928,0.769889,401.876,-42.5901)"
            >
              <rect
                x="485.153"
                y="758.241"
                width="7.076"
                height="104.507"
                fill="rgb(236,236,231)"
                ref={el => (suprise3 = el)}
                opacity="0"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Birdie

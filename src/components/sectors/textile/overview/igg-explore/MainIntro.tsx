
"use client";

import React from "react";

/* TODO: buraya tam SVG içeriğini (paths + defs) yapıştır. */
const VORTEX_SVG = `
<svg role="image" width="1060" height="1060" viewBox="0 0 1060 1060" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg_vortex">
  <style>
    @keyframes vortex_rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .svg_vortex {
      transform-origin: center;
      transform-box: fill-box;
      animation: vortex_rotate 15s infinite linear;
    }
  </style>
<g opacity="0.5">
<path d="M342.734 361.183C365.793 334.886 394.249 313.864 426.161 299.55C458.074 285.237 492.694 277.969 527.67 278.239C562.641 278.509 597.148 286.312 628.834 301.117C660.523 315.923 688.648 337.381 711.295 364.033" stroke="url(#paint0_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M657.778 731.325C628.233 749.928 595.09 762.077 560.516 766.968C525.948 771.864 490.735 769.397 457.184 759.728C423.634 750.06 392.507 733.413 365.841 710.87C339.179 688.328 317.579 660.407 302.466 628.935" stroke="url(#paint1_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M290.856 600.327C271.391 542.184 274.18 478.894 298.678 422.688" stroke="url(#paint2_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M724.08 390.652C751.958 432.844 765.651 482.824 763.17 533.335C760.689 583.846 742.166 632.244 710.287 671.501" stroke="url(#paint3_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M248.352 503.681C250.809 465.826 260.984 428.876 278.256 395.098C295.524 361.325 319.525 331.444 348.776 307.292C378.028 283.14 411.915 265.228 448.349 254.665C484.778 244.096 522.988 241.099 560.625 245.853" stroke="url(#paint4_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M565.037 803.265C495.232 812.995 424.301 796.452 366.006 756.84C307.707 717.234 266.202 657.381 249.535 588.902" stroke="url(#paint5_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M649.562 265.725C696.007 288.187 735.461 322.855 763.699 366.022C791.942 409.189 807.909 459.226 809.888 510.774C811.867 562.321 799.783 613.433 774.935 658.641C750.087 703.844 713.406 741.438 668.824 767.389" stroke="url(#paint6_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M384.42 219.934C424.637 201.094 468.211 190.483 512.591 188.724C556.965 186.965 601.245 194.095 642.821 209.694C684.402 225.293 722.445 249.044 754.713 279.555C786.985 310.071 812.828 346.723 830.73 387.366" stroke="url(#paint7_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M337.928 796.882C297.394 769.217 263.469 732.934 238.585 690.634C213.699 648.333 198.465 601.056 193.971 552.184C189.477 503.312 195.835 454.051 212.59 407.92C229.345 361.789 256.083 319.929 290.893 285.332" stroke="url(#paint8_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M856.265 479.122C862.993 531.351 857.24 584.437 839.485 634.015C821.729 683.598 792.478 728.261 754.121 764.35C715.765 800.438 669.402 826.924 618.835 841.631C568.267 856.337 514.93 858.846 463.207 848.955" stroke="url(#paint9_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M85.9612 727.726C58.499 669.105 43.0314 605.588 40.468 540.906C37.9041 476.224 48.2965 411.679 71.0339 351.074C93.7712 290.464 128.395 235.012 172.87 187.976C217.344 140.939 270.771 103.268 330.017 77.176" stroke="url(#paint10_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M980.903 241.942C1044.69 345.719 1071.1 468.184 1055.74 589.03C1040.38 709.876 984.174 821.839 896.453 906.365C808.732 990.89 694.756 1042.89 573.427 1053.75C452.094 1064.62 330.694 1033.69 229.353 966.094" stroke="url(#paint11_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path opacity="0.7" d="M677.479 884.575C610.543 911.933 537.201 920.346 465.526 908.884C393.856 897.416 326.631 866.526 271.249 819.6C215.87 772.678 174.482 711.543 151.64 642.926C128.799 574.314 125.388 500.873 141.781 430.694" stroke="url(#paint12_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M213.827 236.926C257.173 189.436 310.794 152.47 370.594 128.845C430.395 105.22 494.797 95.5601 558.897 100.601C623.001 105.642 685.102 125.251 740.476 157.933C795.849 190.616 843.026 235.509 878.419 289.191C913.806 342.874 936.477 403.924 944.691 467.697C952.911 531.469 946.458 596.274 925.833 657.173C905.203 718.072 870.947 773.459 825.669 819.107C780.39 864.76 725.286 899.471 664.558 920.597" stroke="url(#paint13_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M433.041 329.867C466.838 313.527 504.352 306.406 541.785 309.223C579.218 312.045 615.24 324.706 646.21 345.923C677.176 367.144 701.986 396.168 718.132 430.06C734.273 463.951 741.176 501.503 738.136 538.922" stroke="url(#paint14_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M426.399 710.127C396.002 694.095 369.932 670.947 350.415 642.656C330.899 614.366 318.517 581.776 314.327 547.667C310.132 513.553 314.256 478.937 326.339 446.764C338.422 414.591 358.109 385.818 383.724 362.902" stroke="url(#paint15_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M716.375 616.889C697.81 654.048 668.795 684.966 632.887 705.847C596.983 726.727 555.752 736.656 514.28 734.416" stroke="url(#paint16_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M370.651 414.719C389.496 387.385 415.229 365.515 445.248 351.325C475.262 337.135 508.495 331.127 541.577 333.911C574.659 336.69 606.425 348.167 633.645 367.172C660.87 386.178 682.588 412.039 696.603 442.134" stroke="url(#paint17_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M531.723 710.009C506.406 710.809 481.189 706.495 457.576 697.324C433.964 688.158 412.444 674.323 394.301 656.648C376.157 638.973 361.763 617.822 351.981 594.461C342.199 571.1 337.223 546 337.36 520.674" stroke="url(#paint18_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M713.941 511.598C715.906 548.278 707.109 584.736 688.624 616.482C670.139 648.229 642.777 673.882 609.908 690.283" stroke="url(#paint19_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M386.479 607.856C371.294 583.311 362.866 555.186 362.043 526.337C361.223 497.483 368.037 468.928 381.801 443.559C395.565 418.19 415.787 396.907 440.422 381.869C465.057 366.827 493.224 358.565 522.083 357.911" stroke="url(#paint20_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M677.806 582.686C669.6 603.121 657.365 621.691 641.826 637.292C626.282 652.888 607.754 665.194 587.352 673.47C566.945 681.747 545.085 685.823 523.068 685.459C501.051 685.094 479.333 680.293 459.215 671.344" stroke="url(#paint21_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M583.438 368.351C622.347 382.982 654.236 411.855 672.649 449.127C691.058 486.394 694.61 529.272 682.589 569.064" stroke="url(#paint22_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M525 660.857C500.478 660.719 476.426 654.105 455.28 641.681C434.134 629.257 416.649 611.468 404.589 590.114C392.53 568.76 386.327 544.599 386.607 520.077C386.891 495.551 393.647 471.541 406.194 450.467" stroke="url(#paint23_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M631.277 430.879C646.679 448.776 657.276 470.301 662.072 493.421C666.864 516.545 665.694 540.508 658.677 563.055C651.655 585.602 639.014 605.99 621.94 622.306C604.866 638.618 583.924 650.322 561.079 656.311" stroke="url(#paint24_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M441.389 410.998C462.965 394.544 488.879 384.757 515.947 382.84C543.016 380.922 570.052 386.959 593.735 400.202" stroke="url(#paint25_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M413.037 501.366C416.872 480.078 426.654 460.31 441.256 444.349C455.854 428.388 474.674 416.888 495.536 411.178C516.402 405.467 538.457 405.78 559.148 412.077C579.839 418.379 598.328 430.405 612.471 446.774" stroke="url(#paint26_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M576.324 624.484C562.503 631.279 547.456 635.218 532.078 636.065C516.704 636.908 501.316 634.65 486.832 629.413C472.348 624.176 459.072 616.075 447.794 605.592C436.511 595.105 427.463 582.458 421.18 568.396" stroke="url(#paint27_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M627.456 468.885C637.749 488.705 642.025 511.105 639.752 533.325C637.479 555.541 628.763 576.616 614.677 593.945" stroke="url(#paint28_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M505.625 434.023C521.07 430.472 537.178 431.064 552.319 435.737C567.461 440.415 581.097 449.008 591.85 460.647C602.603 472.289 610.089 486.565 613.55 502.029C617.011 517.492 616.329 533.6 611.561 548.713" stroke="url(#paint29_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M467.184 589.901C458.013 582.027 450.522 572.383 445.162 561.545C439.803 550.707 436.687 538.903 435.991 526.829C435.3 514.76 437.047 502.677 441.128 491.295C445.214 479.917 451.55 469.477 459.76 460.604" stroke="url(#paint30_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
<path d="M595.283 578.76C584.156 592.311 569.308 602.311 552.571 607.534C535.833 612.756 517.931 612.969 501.07 608.154" stroke="url(#paint31_linear_1_41)" stroke-width="8" stroke-linecap="round"></path>
</g>
<defs>
<linearGradient id="paint0_linear_1_41" x1="669.586" y1="299.886" x2="336.47" y2="363.664" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="0.990639" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint1_linear_1_41" x1="312.504" y1="663.177" x2="643.148" y2="736.277" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint2_linear_1_41" x1="303.801" y1="428.256" x2="295.212" y2="580.029" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint3_linear_1_41" x1="710.287" y1="665.771" x2="687.001" y2="423.085" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint4_linear_1_41" x1="689.856" y1="268.637" x2="277.153" y2="570.224" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint5_linear_1_41" x1="281.471" y1="699.72" x2="563.38" y2="807.881" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint6_linear_1_41" x1="787.857" y1="668.93" x2="674.696" y2="269.319" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52" stop-opacity="0.989583"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint7_linear_1_41" x1="789.632" y1="384.814" x2="373.681" y2="282.211" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint8_linear_1_41" x1="187.614" y1="426.542" x2="319.325" y2="735.074" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint9_linear_1_41" x1="531.056" y1="849.093" x2="866.071" y2="504.519" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint10_linear_1_41" x1="326.646" y1="137.761" x2="177.358" y2="742.991" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint11_linear_1_41" x1="628.654" y1="1099.4" x2="1111.46" y2="282.837" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint12_linear_1_41" x1="117.638" y1="595.237" x2="624.345" y2="852.753" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint13_linear_1_41" x1="914.45" y1="665.98" x2="661.992" y2="112.368" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint14_linear_1_41" x1="757.056" y1="533.628" x2="398.037" y2="374.966" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint15_linear_1_41" x1="320.946" y1="427.782" x2="395.05" y2="692.769" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint16_linear_1_41" x1="496.586" y1="729.677" x2="674.714" y2="602.714" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint17_linear_1_41" x1="709.046" y1="429.691" x2="380.182" y2="438.852" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint18_linear_1_41" x1="327.019" y1="539.017" x2="500" y2="710.582" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint19_linear_1_41" x1="594.312" y1="694.568" x2="675.883" y2="518.903" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint20_linear_1_41" x1="492.225" y1="366.439" x2="421.814" y2="615.408" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint21_linear_1_41" x1="470.129" y1="686.226" x2="667.399" y2="608.272" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint22_linear_1_41" x1="687.602" y1="527.473" x2="576.047" y2="401.021" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint23_linear_1_41" x1="392.951" y1="447.787" x2="558.659" y2="645.052" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint24_linear_1_41" x1="619.355" y1="636.207" x2="652.276" y2="458.639" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint25_linear_1_41" x1="603.11" y1="407.541" x2="461.445" y2="430.874" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint26_linear_1_41" x1="604.701" y1="424.132" x2="420.793" y2="530.92" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint27_linear_1_41" x1="419.38" y1="581.53" x2="559.113" y2="633.476" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint28_linear_1_41" x1="607.636" y1="600.735" x2="608.744" y2="482.228" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint29_linear_1_41" x1="620.983" y1="548.633" x2="486.515" y2="448.426" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint30_linear_1_41" x1="449.386" y1="463.099" x2="455.067" y2="580.517" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
<linearGradient id="paint31_linear_1_41" x1="493.855" y1="605.54" x2="580.118" y2="569.584" gradientUnits="userSpaceOnUse">
<stop stop-color="#B36E52"></stop>
<stop offset="1" stop-color="#B36E52" stop-opacity="0"></stop>
</linearGradient>
</defs>
</svg>
`;

export default function MainIntro() {
  // Eğer farklı ekranlarda farklı ofset istersen, bu değeri burada değiştir.
  // Negatif yüzde arttıkça SVG yukarı kayar (logo daha çok ortalanır).
  const svgTranslateY = "-65%"; // deney: "-58%", "-64%", "-70%"

  return (
    <section className="relative min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center overflow-hidden">
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 pointer-events-none" />

      {/* VORTEX (mutlak ortalanmış, ama Y transform'u burada ince ayarlandı) */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 pointer-events-none"
        // inline transform ile -50% x + özel Y çevirisi uyguluyoruz:
        style={{
          transform: `translate(-50%, ${svgTranslateY})`,
          willChange: "transform",
        }}
      >
        <div className="w-[620px] h-[620px] md:w-[860px] md:h-[860px] lg:w-[1060px] lg:h-[1060px] opacity-90">
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: VORTEX_SVG }}
          />
        </div>
      </div>

      {/* İçerik: logo + metinler (logo merkezde) */}
      <div className="relative z-20 w-full max-w-[900px] px-6 py-24 flex flex-col items-center text-center">
        {/* LOGO (tam merkezde) */}
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 md:w-56 md:h-56 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 shadow-xl">
            <img
              src="/assets/menu/logo.svg"
              alt="IGG Logo"
              className="w-24 md:w-36 h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Metin blokları — logo altında, ortalanmış */}


        {/* (ABOUT US) yazısı METİNLERİN ALTINDA */}
        <div className="mt-8 text-sm text-[#b58f7f] tracking-widest">
          (ABOUT US)
        </div>
        <div className="mt-8 max-w-[720px]">
          <p className="text-white/95 text-base md:text-lg leading-relaxed font-light mb-6">
            Our team is celebrating two decades by establishing our new
            locations in Portugal: at the bright city of Lisbon and the
            Atlantic island of Madeira. From catered experiences and immersive
            trips, our commitment is to excel expectations and abide by the
            most demanding requirements.
          </p>

          <p className="text-white/90 text-base md:text-lg leading-relaxed font-light mb-6">
            We have redefined the boundaries of travel services in Portugal!
          </p>

          <p className="text-white/90 text-base md:text-lg leading-relaxed font-light">
            Lasting memories that set us aside: premier vehicles, unique
            enriching journeys, ultimate guided excursions, adventures through
            pristine wildlife sanctuaries, vehicles and chauffeurs for special
            events…
          </p>
        </div>
      </div>

      {/* Mobile fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
    </section>
  );
}

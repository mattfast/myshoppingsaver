import React, { useState, useRef, useEffect } from "react";

import "@fontsource/rubik";
import "@fontsource/rubik/500.css"; 
import "@fontsource/rubik/700.css"; 
import "@fontsource/figtree";
import "@fontsource/figtree/600.css";

const TikTok = () => {
  return (
    <div>
        <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@scout2015/video/6718335390845095173" data-video-id="6718335390845095173" style={{maxWidth: "605px", minWidth: "325px"}} >
            <section>
                <a target="_blank" title="@scout2015" href="https://www.tiktok.com/@scout2015?refer=embed">
                @scout2015
                </a>
                Scramble up ur name &#38; I’ll try to guess it😍❤️
                <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">
                #foryoupage
                </a>
                <a title="petsoftiktok" target="_blank" href="https://www.tiktok.com/tag/petsoftiktok?refer=embed">
                #petsoftiktok
                </a>
                <a title="aesthetic" target="_blank" href="https://www.tiktok.com/tag/aesthetic?refer=embed">
                #aesthetic
                </a>
                <a target="_blank" title="♬ original sound - tiff" href="https://www.tiktok.com/music/original-sound-6689804660171082501?refer=embed">
                ♬ original sound - tiff
                </a>
            </section>
        </blockquote>
        <script async src="https://www.tiktok.com/embed.js"></script>
    </div>
  )
};

/*

          <div className="chatGroupAI">
            <div className="chatCellTikTok">
              <div className="tiktokStyle">
                <TikTok url="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
              </div>
            </div>
          </div>
*/

export default TikTok;

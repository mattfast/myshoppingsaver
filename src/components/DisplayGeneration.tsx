import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Spacer from "./base/Spacer";
import CopyArea from "./CopyArea";
import GenerationFooter from "./GenerationFooter";

const categoryList = ["price", "listing_title", "description", "category", "subcategory", "length", "type", "fit", "occasion", "material", "body_fit", "condition", "color", "source", "age", "style"];

const DisplayGeneration = ({ generation, user, setStatus }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);

  return (
    <Spacer gap={40}>
      <Spacer gap={16}>
        <img src={`https://seller-images-milk.s3.amazonaws.com/${generation["pic_url"]}`} style={{ 
          height: "auto",
          width: "auto",
          maxWidth: "80vw",
          maxHeight: "40vh",
          display: "block",
          borderRadius: "4px",
        }}/>
        <GenerationFooter user={user} setStatus={setStatus}/>
      </Spacer>
      <Spacer gap={32}>
        { categoryList.map(c => (
          <>
            { generation[c] && <CopyArea key={generation[c]} category={c.replace("_", " ")} text={generation[c]} /> }
          </>
        ))}
        { Object.entries(generation).filter(g => ![...categoryList, "pic_url", "bin_links", "bin_edges", "hist_values"].includes(g[0])).map((g) => (
          <CopyArea key={String(g[1])} category={g[0].replace("_", " ")} text={g[1]} />
        ))}
      </Spacer>
    </Spacer>
  )
};

export default DisplayGeneration;

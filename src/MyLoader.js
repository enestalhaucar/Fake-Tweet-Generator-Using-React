import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={60}
    height={47}
    viewBox="0 0 60 47"
    backgroundColor="#333"
    foregroundColor="#444"
    {...props}
  >
    <circle cx="24" cy="24" r="24" />
  </ContentLoader>
)

export default MyLoader
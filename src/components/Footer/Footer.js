import React from 'react';
import '../../styles/footer.css'

export default function Footer() {
  return (
    <div className='footer-container'>
      <div className='link-to-code-container'>
      <a href="https://github.com/LANL-Bioinformatics/PhaME" ><img src={require("../../images/octocat_white.png")} alt="Github" style={{"width":"40px",'height':'40px'}}/>Download PhaME or Get Updates</a>
      </div>
      <div className='system-specs-container'>
      <h4>System Information</h4>
      <p>(****Populate from API*****)</p>
      </div>
    </div>
  )
}
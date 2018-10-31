import React from 'react';
import '../../styles/footer.css'

export default function Footer() {
  return (
    <div className='footer-container'>
      <div className='link-to-code-container'>
      <a href="https://github.com/LANL-Bioinformatics/PhaME" ><img src={require("../../images/Octocat.png")} alt="Github" style={{"width":"40px",'height':'40px'}}/>Download PhaME or Get Updates</a>
      </div>
      <div className='system-specs-container'>
      <h4>System Requirements</h4>
      <p>CPU: 4, Mem: 32 GB </p>
      </div>
    </div>
  )
}
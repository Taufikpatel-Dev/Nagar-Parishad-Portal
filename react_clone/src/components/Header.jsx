import React from 'react';

export default function Header() {
  return (
    <>

<nav className="skip-links" aria-label="à¤¨à¥‡à¤µà¥à¤¹à¤¿à¤—à¥‡à¤¶à¤¨ à¤µà¤—à¤³à¤¾">
  <a href="#main-content">à¤®à¥à¤–à¥à¤¯ à¤¸à¤¾à¤®à¤—à¥à¤°à¥€à¤µà¤° à¤œà¤¾</a>
  <a href="#primary-nav">à¤¨à¥‡à¤µà¥à¤¹à¤¿à¤—à¥‡à¤¶à¤¨à¤µà¤° à¤œà¤¾</a>
  <a href="#a11y-bar">à¤ªà¥à¤°à¤µà¥‡à¤¶à¤¯à¥‹à¤—à¥à¤¯à¤¤à¤¾ à¤¸à¤¾à¤§à¤¨à¤¾à¤‚à¤µà¤° à¤œà¤¾</a>
</nav>


<div id="a11y-bar" role="toolbar" aria-label="GIGW 3.0 à¤ªà¥à¤°à¤µà¥‡à¤¶à¤¯à¥‹à¤—à¥à¤¯à¤¤à¤¾ à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£à¥‡">
    <span className="ab-label" aria-hidden="true">à¤…à¤•à¥à¤·à¤°à¤¾à¤šà¤¾ à¤†à¤•à¤¾à¤°</span>
<div className="ab-group" role="group" aria-label="à¤…à¤•à¥à¤·à¤°à¤¾à¤šà¤¾ à¤†à¤•à¤¾à¤°">

  <button className="ab-btn" onClick={() => window.changeFont('decrease')} aria-label="Small font" title="à¤…-">à¤…-</button>

  <button className="ab-btn on" onClick={() => window.changeFont('reset')} aria-label="Normal font" title="à¤…">à¤…</button>

  <button className="ab-btn" onClick={() => window.changeFont('increase')} aria-label="Large font" title="à¤…+">à¤…+</button>

</div>
  
  <div className="ab-sep" aria-hidden="true"></div>
  <span className="ab-label" aria-hidden="true">à¤…à¤‚à¤¤à¤°</span>
  <div className="ab-group" role="group" aria-label="à¤“à¤³à¥€à¤¤à¥€à¤² à¤…à¤‚à¤¤à¤°">
    <button className="ab-btn on" id="ab-sn" onClick={() => window.setSpacing('normal')} aria-label="à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤…à¤‚à¤¤à¤°" aria-pressed="true">à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯</button>
  <button className="ab-btn" id="ab-sw" onClick={() => window.setSpacing('wide')} aria-label="à¤µà¤¿à¤¸à¥à¤¤à¥ƒà¤¤ à¤…à¤‚à¤¤à¤°" aria-pressed="false">à¤µà¤¿à¤¸à¥à¤¤à¥ƒà¤¤</button>
  </div>
  <div className="ab-sep" aria-hidden="true"></div>
  <span className="ab-label" aria-hidden="true">à¤¥à¥€à¤®</span>
  <div className="ab-group" role="group" aria-label="à¤°à¤‚à¤— à¤¥à¥€à¤®">
    <button id="ab-tlight" className="ab-btn theme-active" onClick={() => window.setTheme('light')} aria-label="à¤¹à¤²à¤•à¥€ à¤¥à¥€à¤®" aria-pressed="true">â˜€ à¤¹à¤²à¤•à¥€</button>
    <button id="ab-tdark" className="ab-btn" onClick={() => window.setTheme('dark')} aria-label="à¤—à¤¡à¤¦ à¤¥à¥€à¤®" aria-pressed="false">â˜¾ à¤¡à¤¾à¤°à¥à¤•</button>
   
  </div>
  <div className="ab-sep" aria-hidden="true"></div>
  <div className="ab-group">
    <button id="ab-tts" className="ab-btn" onClick={() => window.toggleTTS()} aria-label="à¤®à¥‹à¤ à¥à¤¯à¤¾à¤¨à¥‡ à¤µà¤¾à¤šà¤¾ â€” à¤®à¤œà¤•à¥‚à¤° à¤¤à¥‡ à¤†à¤µà¤¾à¤œ" aria-pressed="false">â–¶ à¤µà¤¾à¤šà¤¾</button>
    <button id="ab-tts-pause" className="ab-btn" onClick={() => window.pauseTTS()} aria-label="à¤µà¤¾à¤šà¤¨ à¤¥à¤¾à¤‚à¤¬à¤µà¤¾" style={{}} >â¸ à¤¥à¤¾à¤‚à¤¬à¤µà¤¾</button>
    <button id="ab-tts-stop" className="ab-btn" onClick={() => window.stopTTS()} aria-label="à¤µà¤¾à¤šà¤¨ à¤¬à¤‚à¤¦ à¤•à¤°à¤¾" style={{}} >â–  à¤¬à¤‚à¤¦ à¤•à¤°à¤¾</button>
  </div>
  <div id="ab-progress" aria-hidden="true"><div id="ab-fill"></div></div>
  <span className="ab-tts-live" id="ab-live" aria-live="polite" aria-atomic="true"></span>
</div>


<div className="top-strip" role="complementary" aria-label="à¤¸à¥‹à¤¶à¤² à¤®à¥€à¤¡à¤¿à¤¯à¤¾ à¤†à¤£à¤¿ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤®à¤¾à¤¹à¤¿à¤¤à¥€">
  <div className="top-social" role="navigation" aria-label="à¤¸à¥‹à¤¶à¤² à¤®à¥€à¤¡à¤¿à¤¯à¤¾ à¤¦à¥à¤µà¥‡">
    <a href="https://www.facebook.com/solapurcorporation" target="_blank" rel="noopener noreferrer" aria-label="à¤«à¥‡à¤¸à¤¬à¥à¤•">
      <i className="fab fa-facebook-f" aria-hidden="true"></i><span className="sr-only">à¤«à¥‡à¤¸à¤¬à¥à¤•</span>
    </a>
    <a href="https://x.com/smcsolapur" target="_blank" rel="noopener noreferrer" aria-label="à¤Ÿà¥à¤µà¤¿à¤Ÿà¤° / X">
      <i className="fa-solid fa-x" aria-hidden="true"></i><span className="sr-only">à¤Ÿà¥à¤µà¤¿à¤Ÿà¤° / X</span>
    </a>
    <a href="https://www.youtube.com/@solapurmunicipalcorporatio4115" target="_blank" rel="noopener noreferrer" aria-label="à¤¯à¥‚à¤Ÿà¥à¤¯à¥‚à¤¬">
      <i className="fab fa-youtube" aria-hidden="true"></i><span className="sr-only">à¤¯à¥‚à¤Ÿà¥à¤¯à¥‚à¤¬</span>
    </a>
    <a href="https://www.instagram.com/smcsolapur" target="_blank" rel="noopener noreferrer" aria-label="à¤‡à¤‚à¤¸à¥à¤Ÿà¤¾à¤—à¥à¤°à¤¾à¤®">
      <i className="fab fa-instagram" aria-hidden="true"></i><span className="sr-only">à¤‡à¤‚à¤¸à¥à¤Ÿà¤¾à¤—à¥à¤°à¤¾à¤®</span>
    </a>
  </div>
  <div className="top-emergency" role="complementary" aria-label="à¤†à¤ªà¤¤à¥à¤•à¤¾à¤²à¥€à¤¨ à¤¸à¤‚à¤ªà¤°à¥à¤•">
    <span><i className="fas fa-phone" aria-hidden="true"></i> à¥¦à¥¨à¥§à¥­-à¥¨à¥­à¥©à¥«à¥¨à¥¯à¥© &nbsp;|&nbsp; à¥§à¥ªà¥ªà¥¨à¥¦</span>
    <span><i className="fab fa-whatsapp" aria-hidden="true"></i> <a href="https://wa.me/919112221901">à¥¯à¥§à¥§à¥¨à¥¨à¥¨à¥§à¥¯à¥¦à¥§</a></span>
  </div>
  <div className="top-actions">
    <a href="https://www.solapurcorporation.gov.in/screen_reader_marathi.aspx" className="ta-btn" aria-label="à¤¸à¥à¤•à¥à¤°à¥€à¤¨ à¤°à¥€à¤¡à¤° à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤ªà¥ƒà¤·à¥à¤ "><i className="fas fa-assistive-listening-systems" aria-hidden="true"></i> à¤¸à¥à¤•à¥à¤°à¥€à¤¨ à¤°à¥€à¤¡à¤°</a>
    <button className="ta-btn" onClick={() => window.langChange()} aria-label="à¤‡à¤‚à¤—à¥à¤°à¤œà¥€ à¤­à¤¾à¤·à¥‡à¤¤ à¤¸à¥à¤µà¤¿à¤š à¤•à¤°à¤¾">ðŸŒ English</button>
  </div>
</div>


<header className="main-header">
  <div className="mh-inner">
    <div className="logo-wrap">
      <a href="https://www.solapurcorporation.gov.in/home_marathi.aspx" className="logo-img">
        <img src="https://www.solapurcorporation.gov.in/homepage_icon/favicon_smc.png" alt="à¤¸à¥‹à¤²à¤¾à¤ªà¥‚à¤° à¤®à¤¹à¤¾à¤¨à¤—à¤°à¤ªà¤¾à¤²à¤¿à¤•à¤¾ à¤®à¥à¤–à¥à¤¯à¤ªà¥ƒà¤·à¥à¤ " onerror="this.outerHTML='à¤¸à¥‹à¤²à¤¾à¤ªà¥‚à¤° à¤®à¤¹à¤¾à¤¨à¤—à¤°à¤ªà¤¾à¤²à¤¿à¤•à¤¾ à¤®à¥à¤–à¥à¤¯à¤ªà¥ƒà¤·à¥à¤ '" />
      </a>
      <div className="logo-text">
        <h1 id="site-title">à¤¸à¥‹à¤²à¤¾à¤ªà¥‚à¤° à¤®à¤¹à¤¾à¤¨à¤—à¤°à¤ªà¤¾à¤²à¤¿à¤•à¤¾</h1>
        <p>à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤° à¤¸à¤°à¤•à¤¾à¤°</p>
      </div>
    </div>

    
    <div style={{}}  role="search" aria-label="à¤¸à¤‚à¤•à¥‡à¤¤à¤¸à¥à¤¥à¤³ à¤¶à¥‹à¤§">
      <div className="hdr-search">
        <label htmlFor="hdr-search-input" className="sr-only">à¤¸à¥‡à¤µà¤¾, à¤¨à¤¿à¤µà¤¿à¤¦à¤¾, à¤¬à¤¾à¤¤à¤®à¥à¤¯à¤¾ à¤¶à¥‹à¤§à¤¾</label>
        <input type="search" id="hdr-search-input" placeholder="à¤¸à¥‡à¤µà¤¾, à¤¨à¤¿à¤µà¤¿à¤¦à¤¾, à¤¬à¤¾à¤¤à¤®à¥à¤¯à¤¾ à¤¶à¥‹à¤§à¤¾â€¦" autocomplete="off" aria-label="à¤¶à¥‹à¤§à¤¾"  aria-controls="hdr-search-drop" aria-autocomplete="list" aria-haspopup="listbox" />
        <button id="voice-hdr-btn" onClick={() => window.toggleVoice()} aria-label="à¤†à¤µà¤¾à¤œ à¤¶à¥‹à¤§ â€” à¤¬à¥‹à¤²à¤¾" title="à¤†à¤µà¤¾à¤œ à¤¶à¥‹à¤§">
          <i className="fas fa-microphone" aria-hidden="true"></i>
        </button>
        <button onClick={() => window.document.getElementById('hdr-search-input').dispatchEvent(new Event('input'))} aria-label="à¤¶à¥‹à¤§à¤¾">
          <i className="fas fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <div id="hdr-search-drop" role="listbox" aria-label="à¤¶à¥‹à¤§ à¤¸à¥‚à¤šà¤¨à¤¾" aria-live="polite"></div>
    </div>

    
    <div className="hdr-actions">
      <a href="https://www.solapurcorporation.gov.in/deptlogin.aspx" className="ha-btn" aria-label="à¤¸à¥à¤Ÿà¤¾à¤« à¤²à¥‰à¤—à¤¿à¤¨"><i className="fas fa-user" aria-hidden="true"></i><span>à¤²à¥‰à¤—à¤¿à¤¨</span></a>
      <a href="https://www.solapurcorporation.gov.in/tender_details_marathi.aspx" className="ha-btn" aria-label="à¤¨à¤¿à¤µà¤¿à¤¦à¤¾"><i className="fas fa-file-alt" aria-hidden="true"></i><span>à¤¨à¤¿à¤µà¤¿à¤¦à¤¾</span></a>
      <a href="#" onClick={() => window.extLink('https://complaint.solapurcorporation.org')} className="ha-btn" aria-label="à¤¤à¤•à¥à¤°à¤¾à¤°à¥€"><i className="fas fa-comments" aria-hidden="true"></i><span>à¤¤à¤•à¥à¤°à¤¾à¤°</span></a>
      <img src="https://www.solapurcorporation.gov.in/homepage_icon/Seal_of_Maharashtra.png" alt="à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤° à¤¶à¤¾à¤¸à¤¨à¤¾à¤šà¤¾ à¤¶à¤¿à¤•à¥à¤•à¤¾" width="68" style={{}}  />
    </div>
  </div>

  
  <nav className="nav-bar"  aria-label="à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤• à¤¨à¥‡à¤µà¥à¤¹à¤¿à¤—à¥‡à¤¶à¤¨">
    <div className="nav-inner">
      <ul className="main-nav" id="primary-nav" role="menubar">
        <li role="none"><a href="https://www.solapurcorporation.gov.in/home_marathi.aspx" role="menuitem" aria-current="page"><i className="fas fa-home" aria-hidden="true"></i> à¤®à¥à¤–à¥à¤¯à¤ªà¥ƒà¤·à¥à¤ </a></li>
        <li className="has-sub" role="none">
          <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" id="nav-corp"><i className="fas fa-city" aria-hidden="true"></i> à¤®à¤¹à¤¾à¤¨à¤—à¤°à¤ªà¤¾à¤²à¤¿à¤•à¤¾</a>
          <ul className="submenu" aria-labelledby="nav-corp" role="menu">
            <li role="none"><a href="https://www.solapurcorporation.gov.in/smc_profile_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-info-circle"></i>à¤†à¤®à¤šà¥à¤¯à¤¾à¤¬à¤¦à¥à¤¦à¤²</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/mission_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-bullseye"></i>à¤§à¥à¤¯à¥‡à¤¯-à¤¦à¥ƒà¤·à¥à¤Ÿà¤¿à¤•à¥‹à¤¨</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/solapur_city_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-map-marker-alt"></i>à¤¸à¥‹à¤²à¤¾à¤ªà¥‚à¤° à¤¶à¤¹à¤°</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/history_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-history"></i>à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/about_us_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-info-circle"></i>à¤­à¥‚à¤®à¤¿à¤•à¤¾-à¤•à¤¾à¤°à¥à¤¯à¥‡</a></li>
            <li className="has-sub" role="none">
              <a href="#" role="menuitem" tabindex="-1"><i className="fas fa-sitemap"></i>à¤¸à¤‚à¤˜à¤Ÿà¤¨à¤¾à¤¤à¥à¤®à¤• à¤°à¤šà¤¨à¤¾</a>
              <ul className="submenu" role="menu">
                <li role="none"><a href="https://www.solapurcorporation.gov.in/pdf/GazetteSearch.pdf" role="menuitem" tabindex="-1"><i className="fas fa-users"></i>à¤¨à¤—à¤°à¤¸à¥‡à¤µà¤• à¤¯à¤¾à¤¦à¥€</a></li>
                <li role="none"><a href="https://www.solapurcorporation.gov.in/committee_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-building"></i>à¤¸à¤®à¤¿à¤¤à¥à¤¯à¤¾</a></li>
                <li role="none"><a href="https://www.solapurcorporation.gov.in/commissinor_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-user-tie"></i>à¤†à¤¯à¥à¤•à¥à¤¤</a></li>
                <li role="none"><a href="https://www.solapurcorporation.gov.in/organization_structure_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-users"></i>à¤ªà¥à¤°à¤¶à¤¾à¤¸à¤•à¥€à¤¯ à¤¸à¤‚à¤°à¤šà¤¨à¤¾</a></li>
                <li role="none"><a href="https://www.solapurcorporation.gov.in/department_list_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-landmark"></i>à¤µà¤¿à¤­à¤¾à¤—</a></li>
              </ul>
            </li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/who_is_who_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-users"></i>à¤•à¥‹à¤£ à¤•à¤¾à¤¯ à¤†à¤¹à¥‡</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/atglance_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-chart-bar"></i>à¤¦à¥ƒà¤·à¥à¤Ÿà¥€à¤•à¥à¤·à¥‡à¤ªà¤¾à¤¤</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/public_holidays_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-gavel"></i>à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤¸à¥à¤Ÿà¥à¤Ÿà¥à¤¯à¤¾</a></li>
          </ul>
        </li>
        <li className="has-sub" role="none">
          <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" id="nav-admin"><i className="fas fa-list-alt" aria-hidden="true"></i> à¤ªà¥à¤°à¤¶à¤¾à¤¸à¤¨</a>
          <ul className="submenu" aria-labelledby="nav-admin" role="menu">
            <li role="none"><a href="#" onClick={() => window.extLink('https://resolution.solapurcorporation.org')} role="menuitem" tabindex="-1"><i className="fas fa-gavel"></i>à¤ à¤°à¤¾à¤µ</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/budget_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-coins"></i>à¤…à¤°à¥à¤¥à¤¸à¤‚à¤•à¤²à¥à¤ª</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/audit_reports_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-file-invoice"></i>à¤²à¥‡à¤–à¤¾à¤ªà¤°à¥€à¤•à¥à¤·à¤£ à¤…à¤¹à¤µà¤¾à¤²</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/balance_sheet_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-balance-scale"></i>à¤¤à¤¾à¤³à¥‡à¤¬à¤‚à¤¦</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/city_devlopment_plan_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-heart"></i>à¤¶à¤¹à¤° à¤µà¤¿à¤•à¤¾à¤¸ à¤†à¤°à¤¾à¤–à¤¡à¤¾</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://aadesh.solapurcorporation.org')} role="menuitem" tabindex="-1"><i className="fas fa-file-contract"></i>à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¥€à¤¨ à¤†à¤¦à¥‡à¤¶</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/city_data_policy_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-heart"></i>à¤¶à¤¹à¤° à¤¡à¤¾à¤Ÿà¤¾ à¤§à¥‹à¤°à¤£</a></li>
          </ul>
        </li>
        <li className="has-sub" role="none">
          <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" id="nav-rti"><i className="fas fa-newspaper" aria-hidden="true"></i> à¤®à¤¾à¤¹à¤¿à¤¤à¥€ à¤…à¤§à¤¿à¤•à¤¾à¤°</a>
          <ul className="submenu" aria-labelledby="nav-rti" role="menu">
            <li role="none"><a href="https://www.solapurcorporation.gov.in/RTI_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-info-circle"></i>à¤®à¤¾à¤¹à¤¿à¤¤à¥€ à¤…à¤§à¤¿à¤•à¤¾à¤° à¤•à¤¾à¤¯à¤¦à¤¾</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/section4_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-file"></i>à¤•à¤²à¤® à¥ª à¤®à¤¾à¤¹à¤¿à¤¤à¥€</a></li>
          </ul>
        </li>
        <li className="has-sub" role="none">
          <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" id="nav-rts"><i className="fas fa-hands-helping" aria-hidden="true"></i> à¤¸à¥‡à¤µà¥‡à¤šà¤¾ à¤…à¤§à¤¿à¤•à¤¾à¤°</a>
          <ul className="submenu" aria-labelledby="nav-rts" role="menu">
            <li role="none"><a href="https://www.solapurcorporation.gov.in/RTS_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-check-circle"></i>à¤¸à¥‡à¤µà¤¾ à¤¹à¤®à¥€ à¤•à¤¾à¤¯à¤¦à¤¾</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/citizencharter_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-scroll"></i>à¤¨à¤¾à¤—à¤°à¤¿à¤• à¤¸à¤¨à¤¦</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/pdf/rts_appeal_officer_contact_information_marathi.pdf" role="menuitem" tabindex="-1"><i className="fas fa-home"></i>à¤…à¤ªà¤¿à¤²à¥€à¤¯ à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¥à¤°à¤®à¤¾à¤‚à¤•</a></li>
          </ul>
        </li>
        <li className="has-sub" role="none">
          <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" id="nav-citizen"><i className="fas fa-users" aria-hidden="true"></i> à¤¨à¤¾à¤—à¤°à¤¿à¤•</a>
          <ul className="submenu" aria-labelledby="nav-citizen" role="menu">
            <li role="none"><a href="#" onClick={() => window.extLink('https://smctaxcalc.solapurcorporation.org/counter_receipt_online.aspx')} role="menuitem" tabindex="-1"><i className="fas fa-home"></i>à¤®à¤¾à¤²à¤®à¤¤à¥à¤¤à¤¾ à¤•à¤°</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://complaint.solapurcorporation.org')} role="menuitem" tabindex="-1"><i className="fas fa-comment-dots"></i>à¤¤à¤•à¥à¤°à¤¾à¤°</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/rts_panel.aspx" role="menuitem" tabindex="-1"><i className="fas fa-laptop"></i>à¤‘à¤¨à¤²à¤¾à¤ˆà¤¨ à¤¸à¥‡à¤µà¤¾</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://dashboardsmc.solapurcorporation.org')} role="menuitem" tabindex="-1"><i className="fas fa-receipt"></i>à¤¸à¥‡à¤µà¤¾ à¤¹à¤®à¥€ à¤•à¤¾à¤¯à¤¦à¤¾ à¤¡à¥…à¤¶à¤¬à¥‹à¤°à¥à¤¡</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://smcgis.solapurcorporation.org')} role="menuitem" tabindex="-1"><i className="fas fa-map"></i>à¤œà¥€à¤†à¤¯à¤à¤¸ à¤¡à¥…à¤¶à¤¬à¥‹à¤°à¥à¤¡</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://gis-dp.solapurcorporation.org/')} role="menuitem" tabindex="-1"><i className="fas fa-map"></i>à¤µà¤¿à¤•à¤¾à¤¸ à¤¯à¥‹à¤œà¤¨à¤¾ à¤¡à¥…à¤¶à¤¬à¥‹à¤°à¥à¤¡</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/rts_appeal.aspx" role="menuitem" tabindex="-1"><i className="fas fa-history"></i>à¤ªà¥à¤°à¤¥à¤® à¤¸à¥‡à¤µà¤¾ à¤…à¤ªà¥€à¤²</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/rts_appeal2.aspx" role="menuitem" tabindex="-1"><i className="fas fa-history"></i>à¤¦à¥à¤µà¤¿à¤¤à¥€à¤¯ à¤¸à¥‡à¤µà¤¾ à¤…à¤ªà¥€à¤²</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/faq_new.aspx" role="menuitem" tabindex="-1"><i className="fas fa-history"></i>à¤µà¤¾à¤°à¤‚à¤µà¤¾à¤° à¤µà¤¿à¤šà¤¾à¤°à¤²à¥‡ à¤œà¤¾à¤£à¤¾à¤°à¥‡ à¤ªà¥à¤°à¤¶à¥à¤¨</a></li>
          </ul>
        </li>
        <li className="has-sub" role="none">
          <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" id="nav-pub"><i className="fas fa-download" aria-hidden="true"></i> à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¨</a>
          <ul className="submenu" aria-labelledby="nav-pub" role="menu">
           <li role="none"><a href="https://www.solapurcorporation.gov.in/purvani_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-lightbulb"></i>à¤¸à¤°à¥à¤µà¤¸à¤¾à¤§à¤¾à¤°à¤£ à¤¸à¤­à¥‡à¤šà¥€ à¤µà¤¿à¤·à¤¯à¤¸à¥‚à¤šà¥€</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/event_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-newspaper"></i>à¤ˆ-à¤¨à¥à¤¯à¥‚à¤œ</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/recruitment_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-briefcase"></i>à¤­à¤°à¤¤à¥€</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/beneficiary_list_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-lightbulb"></i>à¤²à¤¾à¤­à¤¾à¤°à¥à¤¥à¥€ à¤¯à¤¾à¤¦à¥€</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/award_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-trophy"></i>à¤‰à¤ªà¤²à¤¬à¥à¤§à¥€</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/dataset_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-history"></i>à¤¶à¤¹à¤° à¤¡à¤¾à¤Ÿà¤¾à¤¸à¥‡à¤Ÿ</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/dmp_plan_details_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-history"></i>à¤†à¤ªà¤¤à¥à¤¤à¥€ à¤µà¥à¤¯.à¤†à¤°à¤¾à¤–à¤¡à¤¾</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://aadesh.solapurcorporation.org/water_reports_display.aspx')} role="menuitem" tabindex="-1"><i className="fas fa-lightbulb"></i>à¤ªà¤¾à¤£à¥€ à¤¤à¤ªà¤¾à¤¸à¤£à¥€ à¤…à¤¹à¤µà¤¾à¤²</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://smctaxcalc.solapurcorporation.org/due_list.aspx')} role="menuitem" tabindex="-1"><i className="fas fa-lightbulb"></i>à¤Ÿà¥…à¤•à¥à¤¸ à¤¡à¤¿à¤«à¥‰à¤²à¥à¤Ÿà¤°à¥à¤¸ à¤¯à¤¾à¤¦à¥€</a></li>

            <li role="none"><a href="https://www.solapurcorporation.gov.in/atglance_marathi" role="menuitem" tabindex="-1"><i className="fas fa-receipt"></i>à¤«à¥‹à¤Ÿà¥‹ à¤—à¥…à¤²à¤°à¥€</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/video_gallery1.aspx" role="menuitem" tabindex="-1"><i className="fas fa-video"></i>à¤µà¥à¤¹à¤¿à¤¡à¤¿à¤“ à¤—à¥…à¤²à¤°à¥€</a></li>
            <li role="none"><a href="https://www.solapurcorporation.gov.in/whatsnew_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-star"></i>à¤¨à¤µà¥€à¤¨ à¤•à¤¾à¤¯ à¤†à¤¹à¥‡</a></li>
            <li role="none"><a href="#" onClick={() => window.extLink('https://aadesh.solapurcorporation.org')} role="menuitem" tabindex="-1"><i className="fas fa-history"></i>à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥‡ à¤•à¤¾à¤¯à¤¦à¥‡</a></li>
          </ul>
        </li>
        <li className="has-sub" role="none">
          <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" id="nav-contact"><i className="fas fa-phone-alt" aria-hidden="true"></i> à¤¸à¤‚à¤ªà¤°à¥à¤•</a>
          <ul className="submenu" aria-labelledby="nav-contact" role="menu">
            <li role="none"><a href="https://www.solapurcorporation.gov.in/contact_us_marathi.aspx" role="menuitem" tabindex="-1"><i className="fas fa-address-card"></i>à¤®à¤¨à¤ªà¤¾ à¤¸à¤‚à¤ªà¤°à¥à¤•</a></li>
          </ul>
        </li>
      </ul>
      <button className="mob-menu-btn" id="mob-btn" aria-label="à¤¨à¥‡à¤µà¥à¤¹à¤¿à¤—à¥‡à¤¶à¤¨ à¤®à¥‡à¤¨à¥‚ à¤Ÿà¥‰à¤—à¤² à¤•à¤°à¤¾" aria-expanded="false" aria-controls="primary-nav">
        <i className="fas fa-bars" aria-hidden="true"></i>
      </button>
    </div>
  </nav>
</header>
    </>
  );
}
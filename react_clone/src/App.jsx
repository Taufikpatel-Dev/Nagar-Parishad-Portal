import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';
import AboutUsMarathi from './pages/AboutUsMarathi';
import Atglance from './pages/Atglance';
import AtglanceMarathi from './pages/AtglanceMarathi';
import AuditReportsMarathi from './pages/AuditReportsMarathi';
import AwardMarathi from './pages/AwardMarathi';
import BalanceSheetMarathi from './pages/BalanceSheetMarathi';
import BeneficiaryListMarathi from './pages/BeneficiaryListMarathi';
import BudgetMarathi from './pages/BudgetMarathi';
import CitizencharterMarathi from './pages/CitizencharterMarathi';
import CityDataPolicyMarathi from './pages/CityDataPolicyMarathi';
import CityDevlopmentPlanMarathi from './pages/CityDevlopmentPlanMarathi';
import CommissinorMarathi from './pages/CommissinorMarathi';
import CommitteeMarathi from './pages/CommitteeMarathi';
import ContactUsMarathi from './pages/ContactUsMarathi';
import DatasetMarathi from './pages/DatasetMarathi';
import Default21 from './pages/Default21';
import DepartmentListMarathi from './pages/DepartmentListMarathi';
import Deptlogin from './pages/Deptlogin';
import DmpPlanDetailsMarathi from './pages/DmpPlanDetailsMarathi';
import Events from './pages/Events';
import EventMarathi from './pages/EventMarathi';
import FaqNew from './pages/FaqNew';
import FeedbackForm from './pages/FeedbackForm';
import Garden from './pages/Garden';
import HelpMarathi from './pages/HelpMarathi';
import HistoryMarathi from './pages/HistoryMarathi';
import HomeMarathi from './pages/HomeMarathi';
import HomeMarathi1 from './pages/HomeMarathi1';
import Index from './pages/Index';
import MissionMarathi from './pages/MissionMarathi';
import OrganizationStructureMarathi from './pages/OrganizationStructureMarathi';
import PublicHolidaysMarathi from './pages/PublicHolidaysMarathi';
import PurvaniMarathi from './pages/PurvaniMarathi';
import RecruitmentMarathi from './pages/RecruitmentMarathi';
import RTIMarathi from './pages/RTIMarathi';
import RtsAppeal from './pages/RtsAppeal';
import RtsAppeal2 from './pages/RtsAppeal2';
import RTSMarathi from './pages/RTSMarathi';
import RtsPanel from './pages/RtsPanel';
import ScreenReaderMarathi from './pages/ScreenReaderMarathi';
import Section4Marathi from './pages/Section4Marathi';
import SitemapMarathi from './pages/SitemapMarathi';
import SmcHospital from './pages/SmcHospital';
import SmcProfileMarathi from './pages/SmcProfileMarathi';
import SolapurCityMarathi from './pages/SolapurCityMarathi';
import TenderDetailsMarathi from './pages/TenderDetailsMarathi';
import TermsconditionMarathi from './pages/TermsconditionMarathi';
import VideoGallery1 from './pages/VideoGallery1';
import WebsitePoliciesMarathi from './pages/WebsitePoliciesMarathi';
import WhatsnewMarathi from './pages/WhatsnewMarathi';
import WhoIsWhoMarathi from './pages/WhoIsWhoMarathi';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="about_us_marathi.aspx" element={<AboutUsMarathi />} />
        <Route path="about_us_marathi.html" element={<AboutUsMarathi />} />
        <Route path="atglance.aspx" element={<Atglance />} />
        <Route path="atglance.html" element={<Atglance />} />
        <Route path="atglance_marathi.aspx" element={<AtglanceMarathi />} />
        <Route path="atglance_marathi.html" element={<AtglanceMarathi />} />
        <Route path="audit_reports_marathi.aspx" element={<AuditReportsMarathi />} />
        <Route path="audit_reports_marathi.html" element={<AuditReportsMarathi />} />
        <Route path="award_marathi.aspx" element={<AwardMarathi />} />
        <Route path="award_marathi.html" element={<AwardMarathi />} />
        <Route path="balance_sheet_marathi.aspx" element={<BalanceSheetMarathi />} />
        <Route path="balance_sheet_marathi.html" element={<BalanceSheetMarathi />} />
        <Route path="beneficiary_list_marathi.aspx" element={<BeneficiaryListMarathi />} />
        <Route path="beneficiary_list_marathi.html" element={<BeneficiaryListMarathi />} />
        <Route path="budget_marathi.aspx" element={<BudgetMarathi />} />
        <Route path="budget_marathi.html" element={<BudgetMarathi />} />
        <Route path="citizencharter_marathi.aspx" element={<CitizencharterMarathi />} />
        <Route path="citizencharter_marathi.html" element={<CitizencharterMarathi />} />
        <Route path="city_data_policy_marathi.aspx" element={<CityDataPolicyMarathi />} />
        <Route path="city_data_policy_marathi.html" element={<CityDataPolicyMarathi />} />
        <Route path="city_devlopment_plan_marathi.aspx" element={<CityDevlopmentPlanMarathi />} />
        <Route path="city_devlopment_plan_marathi.html" element={<CityDevlopmentPlanMarathi />} />
        <Route path="commissinor_marathi.aspx" element={<CommissinorMarathi />} />
        <Route path="commissinor_marathi.html" element={<CommissinorMarathi />} />
        <Route path="committee_marathi.aspx" element={<CommitteeMarathi />} />
        <Route path="committee_marathi.html" element={<CommitteeMarathi />} />
        <Route path="contact_us_marathi.aspx" element={<ContactUsMarathi />} />
        <Route path="contact_us_marathi.html" element={<ContactUsMarathi />} />
        <Route path="dataset_marathi.aspx" element={<DatasetMarathi />} />
        <Route path="dataset_marathi.html" element={<DatasetMarathi />} />
        <Route path="Default21.aspx" element={<Default21 />} />
        <Route path="Default21.html" element={<Default21 />} />
        <Route path="department_list_marathi.aspx" element={<DepartmentListMarathi />} />
        <Route path="department_list_marathi.html" element={<DepartmentListMarathi />} />
        <Route path="deptlogin.aspx" element={<Deptlogin />} />
        <Route path="deptlogin.html" element={<Deptlogin />} />
        <Route path="dmp_plan_details_marathi.aspx" element={<DmpPlanDetailsMarathi />} />
        <Route path="dmp_plan_details_marathi.html" element={<DmpPlanDetailsMarathi />} />
        <Route path="events.aspx" element={<Events />} />
        <Route path="events.html" element={<Events />} />
        <Route path="event_marathi.aspx" element={<EventMarathi />} />
        <Route path="event_marathi.html" element={<EventMarathi />} />
        <Route path="faq_new.aspx" element={<FaqNew />} />
        <Route path="faq_new.html" element={<FaqNew />} />
        <Route path="feedback_form.aspx" element={<FeedbackForm />} />
        <Route path="feedback_form.html" element={<FeedbackForm />} />
        <Route path="garden.aspx" element={<Garden />} />
        <Route path="garden.html" element={<Garden />} />
        <Route path="help_marathi.aspx" element={<HelpMarathi />} />
        <Route path="help_marathi.html" element={<HelpMarathi />} />
        <Route path="history_marathi.aspx" element={<HistoryMarathi />} />
        <Route path="history_marathi.html" element={<HistoryMarathi />} />
        <Route index element={<HomeMarathi />} />
        <Route path="home_marathi_1.aspx" element={<HomeMarathi1 />} />
        <Route path="home_marathi_1.html" element={<HomeMarathi1 />} />
        <Route path="index.aspx" element={<Index />} />
        <Route path="index.html" element={<Index />} />
        <Route path="mission_marathi.aspx" element={<MissionMarathi />} />
        <Route path="mission_marathi.html" element={<MissionMarathi />} />
        <Route path="organization_structure_marathi.aspx" element={<OrganizationStructureMarathi />} />
        <Route path="organization_structure_marathi.html" element={<OrganizationStructureMarathi />} />
        <Route path="public_holidays_marathi.aspx" element={<PublicHolidaysMarathi />} />
        <Route path="public_holidays_marathi.html" element={<PublicHolidaysMarathi />} />
        <Route path="purvani_marathi.aspx" element={<PurvaniMarathi />} />
        <Route path="purvani_marathi.html" element={<PurvaniMarathi />} />
        <Route path="recruitment_marathi.aspx" element={<RecruitmentMarathi />} />
        <Route path="recruitment_marathi.html" element={<RecruitmentMarathi />} />
        <Route path="RTI_marathi.aspx" element={<RTIMarathi />} />
        <Route path="RTI_marathi.html" element={<RTIMarathi />} />
        <Route path="rts_appeal.aspx" element={<RtsAppeal />} />
        <Route path="rts_appeal.html" element={<RtsAppeal />} />
        <Route path="rts_appeal2.aspx" element={<RtsAppeal2 />} />
        <Route path="rts_appeal2.html" element={<RtsAppeal2 />} />
        <Route path="RTS_marathi.aspx" element={<RTSMarathi />} />
        <Route path="RTS_marathi.html" element={<RTSMarathi />} />
        <Route path="rts_panel.aspx" element={<RtsPanel />} />
        <Route path="rts_panel.html" element={<RtsPanel />} />
        <Route path="screen_reader_marathi.aspx" element={<ScreenReaderMarathi />} />
        <Route path="screen_reader_marathi.html" element={<ScreenReaderMarathi />} />
        <Route path="section4_marathi.aspx" element={<Section4Marathi />} />
        <Route path="section4_marathi.html" element={<Section4Marathi />} />
        <Route path="sitemap_marathi.aspx" element={<SitemapMarathi />} />
        <Route path="sitemap_marathi.html" element={<SitemapMarathi />} />
        <Route path="smc_hospital.aspx" element={<SmcHospital />} />
        <Route path="smc_hospital.html" element={<SmcHospital />} />
        <Route path="smc_profile_marathi.aspx" element={<SmcProfileMarathi />} />
        <Route path="smc_profile_marathi.html" element={<SmcProfileMarathi />} />
        <Route path="solapur_city_marathi.aspx" element={<SolapurCityMarathi />} />
        <Route path="solapur_city_marathi.html" element={<SolapurCityMarathi />} />
        <Route path="tender_details_marathi.aspx" element={<TenderDetailsMarathi />} />
        <Route path="tender_details_marathi.html" element={<TenderDetailsMarathi />} />
        <Route path="termscondition_marathi.aspx" element={<TermsconditionMarathi />} />
        <Route path="termscondition_marathi.html" element={<TermsconditionMarathi />} />
        <Route path="video_gallery1.aspx" element={<VideoGallery1 />} />
        <Route path="video_gallery1.html" element={<VideoGallery1 />} />
        <Route path="website_policies_marathi.aspx" element={<WebsitePoliciesMarathi />} />
        <Route path="website_policies_marathi.html" element={<WebsitePoliciesMarathi />} />
        <Route path="whatsnew_marathi.aspx" element={<WhatsnewMarathi />} />
        <Route path="whatsnew_marathi.html" element={<WhatsnewMarathi />} />
        <Route path="who_is_who_marathi.aspx" element={<WhoIsWhoMarathi />} />
        <Route path="who_is_who_marathi.html" element={<WhoIsWhoMarathi />} />
      </Route>
    </Routes>
  );
}

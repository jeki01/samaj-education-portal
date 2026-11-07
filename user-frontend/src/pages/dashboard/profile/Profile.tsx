import { useAccount } from "@/context/account/AccountContext";
import UserProfileFillIcon from "@/svg/UserProfileFillIcon";
import PageTitle from "@/ui/page-title/PageTitle";
import PersonalDetails from "./components/personal-details/PersonalDetails";
import PlatformDetails from "./components/platform-details/PlatformDetails";
import ReferEarn from "./components/refer-earn/ReferEarn";
import UseTransactionHistory from "./components/tansaction-history/hook/useTransactionHistory";
import TansactionHistory from "./components/tansaction-history/TansactionHistory";
import UseProfileDetails from "./hooks/useProfileDetails";
import "./profile.css";
import SkillTransactionTable from "./SkillTransactionTable";

export default function Profile() {
  const { ProfileDetailsData, getProfileDetails } = UseProfileDetails();
  const { tnxList } = UseTransactionHistory();
  const { accountMode } = useAccount();
  return (
    <>
      <div className="profile-page">
        <PageTitle text="Profile" Icon={<UserProfileFillIcon />} />
        <PersonalDetails
          ProfileDetailsData={ProfileDetailsData}
          getProfileDetails={getProfileDetails}
        />
        <PlatformDetails
          ProfileDetailsData={ProfileDetailsData}
        />
        {
          accountMode === "exam" &&
          <ReferEarn />
        }
        {
          accountMode === "exam" ?
            <TansactionHistory tnxList={tnxList} />
            :
            <SkillTransactionTable />
        }
      </div>
    </>
  )
}

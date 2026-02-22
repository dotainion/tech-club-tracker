import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { routes } from "../routes/Routes";
import { Page } from "../layout/Page";
import { AddNewEntry, EngagementAndProgressProvider } from "../components/EngagementAndProgressProvider";
import { useNavigate } from "react-router-dom";

export const EngagementAndProgress = () => {
    const navigate = useNavigate();
    return (
        <Page className="position-relative">
            <EngagementAndProgressProvider>
                <PageHeader
                    title="Track Daily Engagement & Progress"
                    subTitle="Progress, activities & resources used"
                >
                    <AddNewEntry />
                    <PageHeaderButton onClick={()=>navigate(routes.auth().concat().home())}>
                        🏡 Home
                    </PageHeaderButton>
                </PageHeader>
            </EngagementAndProgressProvider>
        </Page>
    );
};


import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Breadcrumbs } from "@material-ui/core";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const PrivacyPolicy = () => {
  return (
    <div className="StaticPage">
      <Header />
      <div className="bredcrum-conatiner ">
        <div className="bredcrum-conatiner__bredcrum_inr">
          <Container maxWidth="lg">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="bredcrum-conatiner__bredcrum-text"
            >
              <Link color="inherit" to="/">
                Home
              </Link>
              <Typography
                color="textPrimary"
                className="bredcrum-conatiner__bredcrum-normaltext"
              >
                Privacy Policy
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container maxWidth="lg">
          <div className="StaticPage__div">
            <Paper elevation={0}>
              <div className="StaticPage__div__container">
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__mainHeading"
                >
                  Privacy Policy
                </Typography>

                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  E2E Research Pvt. Ltd. operates the engame.e2eresearch.com
                  website, which provides the SERVICEs of research tools .<br />
                  <br />
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  This page is used to inform website visitors regarding our
                  policies with the collection, use, and disclosure of Personal
                  Information if anyone decided to use our Service.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  If you choose to use our Service, then you agree to the
                  collection and use of information in relation with this
                  policy. The Personal Information that we collect are used for
                  providing and improving the Service. We will not use or share
                  your information with anyone except as described in this
                  Privacy Policy.
                  <br />
                  <br />
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Information Collection and Use
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  For a better experience while using our Service, we may
                  require you to provide us with certain personally identifiable
                  information, including but not limited to your name, phone
                  number, and postal address. The information that we collect
                  will be used to contact or identify you.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Log Data
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  We want to inform you that whenever you visit our Service, we
                  collect information that your browser sends to us that is
                  called Log Data. This Log Data may include information such as
                  your computer’s Internet Protocol (“IP”) address, browser
                  version, pages of our Service that you visit, the time and
                  date of your visit, the time spent on those pages, and other
                  statistics.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Cookies
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Cookies are files with small amount of data that is commonly
                  used an anonymous unique identifier. These are sent to your
                  browser from the website that you visit and are stored on your
                  computer’s hard drive.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Our website uses these “cookies” to collection information and
                  to improve our Service. You have the option to either accept
                  or refuse these cookies, and know when a cookie is being sent
                  to your computer. If you choose to refuse our cookies, you may
                  not be able to use some portions of our Service.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Service Providers
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  We may employ third-party companies and individuals due to the
                  following reasons:
                </Typography>
                <List
                  aria-label="contacts"
                  className="StaticPage__div__container__list"
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon className="StaticPage__div__container__list__icon">
                        <FiberManualRecordIcon />
                      </ListItemIcon>
                      <ListItemText primary="To facilitate our Service" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon className="StaticPage__div__container__list__icon">
                        <FiberManualRecordIcon />
                      </ListItemIcon>
                      <ListItemText primary="To provide the Service on our behalf" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon className="StaticPage__div__container__list__icon">
                        <FiberManualRecordIcon />
                      </ListItemIcon>
                      <ListItemText primary="To perform Service-related services; or" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon className="StaticPage__div__container__list__icon">
                        <FiberManualRecordIcon />
                      </ListItemIcon>
                      <ListItemText primary="To assist us in analyzing how our Service is used." />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  We want to inform our Service users that these third parties
                  have access to your Personal Information. The reason is to
                  perform the tasks assigned to them on our behalf. However,
                  they are obligated not to disclose or use the information for
                  any other purpose.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Security
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  We value your trust in providing us your Personal Information,
                  thus we are striving to use commercially acceptable means of
                  protecting it. But remember that no method of transmission
                  over the internet, or method of electronic storage is 100%
                  secure and reliable, and we cannot guarantee its absolute
                  security.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Links to Other Sites
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Our Service may contain links to other sites. If you click on
                  a third-party link, you will be directed to that site. Note
                  that these external sites are not operated by us. Therefore,
                  we strongly advise you to review the Privacy Policy of these
                  websites. We have no control over, and assume no
                  responsibility for the content, privacy policies, or practices
                  of any third-party sites or services.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Links to Other Sites
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Our Service may contain links to other sites. If you click on
                  a third-party link, you will be directed to that site. Note
                  that these external sites are not operated by us. Therefore,
                  we strongly advise you to review the Privacy Policy of these
                  websites. We have no control over, and assume no
                  responsibility for the content, privacy policies, or practices
                  of any third-party sites or services.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Children’s Privacy
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Our Services do not address anyone under the age of 18. We do
                  not knowingly collect personal identifiable information from
                  children under 18. In the case we discover that a child under
                  18 has provided us with personal information, we immediately
                  delete this from our servers. If you are a parent or guardian
                  and you are aware that your child has provided us with
                  personal information, please contact us so that we will be
                  able to do necessary actions.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Changes to This Privacy Policy
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  We may update our Privacy Policy from time to time. Thus, we
                  advise you to review this page periodically for any changes.
                  We will notify you of any changes by posting the new Privacy
                  Policy on this page. These changes are effective immediately,
                  after they are posted on this page.
                </Typography>
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  If you have any questions or suggestions about our Privacy
                  Policy, do not hesitate to contact us at
                  support-engame@e2eresearch.com.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  This Privacy Policy page was created at
                  www.engamee2eresearch.com.
                </Typography>
              </div>
            </Paper>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

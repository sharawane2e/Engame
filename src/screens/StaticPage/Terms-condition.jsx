import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Breadcrumbs } from "@material-ui/core";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Footer from "../../components/Footer";

const TermsCondition = () => {
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
                Terms and Condition
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
                  Terms and Condition
                </Typography>

                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Introduction
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  <ol>
                    <li>
                      These terms and conditions shall govern your use of our
                      website.
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          By using our website, you accept these terms and
                          conditions in full; accordingly, if you disagree with
                          these terms and conditions or any part of these terms
                          and conditions, you must not use our website.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          If you [register with our website, submit any material
                          to our website or use any of our website services], we
                          will ask you to expressly agree to these terms and
                          conditions.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You must be at least [18] years of age to use our
                          website; by using our website or agreeing to these
                          terms and conditions, you warrant and represent to us
                          that you are at least [18] years of age.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Our website uses cookies; by using our website or
                          agreeing to these terms and conditions, you consent to
                          our use of cookies in accordance with the terms of our
                          [privacy and cookies policy].
                        </li>
                      </ol>
                    </li>
                    <li>
                      Licence to use website
                      <ol>
                        <li>
                          You may:
                          <ol type="a">
                            <li>Except</li>
                          </ol>
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Except as expressly permitted BY THE provisions of
                          these terms and conditions, you must not download any
                          material from our website or save any such material to
                          your computer.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You may only use our website for [your own personal
                          and business purposes], and you must not use our
                          website for any other purposes.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Except as expressly permitted by these terms and
                          conditions, you must not edit or otherwise modify any
                          material on our website.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Unless you own or control the relevant rights in the
                          material, you must not:
                          <br />
                          <div className="StaticPage__div__container__discription__liStyling__alpha">
                            (a) republish material from our website (including
                            republication on another website);
                            <br />
                            <br />
                            (b) sell, rent or sub-license material from our
                            website;
                            <br />
                            <br />
                            (c) show any material from our website in public;
                            <br />
                            <br />
                            (d) exploit material from our website for a
                            commercial purpose; or
                            <br />
                            <br />
                            (e) redistribute material from our website.
                          </div>
                        </li>
                        <li>
                          We reserve the right to restrict access to areas of
                          our website, or indeed our whole website, at our
                          discretion; you must not circumvent or bypass, or
                          attempt to circumvent or bypass, any access
                          restriction measures on our website.
                        </li>
                      </ol>
                    </li>

                    <li className="StaticPage__div__container__discription__liStyling">
                      Acceptable use
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You must not:
                          <br />
                          <div className="StaticPage__div__container__discription__liStyling__alpha">
                            (a) use our website in any way or take any action
                            that causes, or may cause, damage to the website or
                            impairment of the performance, availability or
                            accessibility of the website;
                            <br />
                            <br />
                            (b) use our website in any way that is unlawful,
                            illegal, fraudulent or harmful, or in connection
                            with any unlawful, illegal, fraudulent or harmful
                            purpose or activity;
                            <br />
                            <br />
                            (c) use our website to copy, store, host, transmit,
                            send, use, publish or distribute any material which
                            consists of (or is linked to) any spyware, computer
                            virus, Trojan horse, worm, keystroke logger, rootkit
                            or other malicious computer software;
                            <br />
                            <br />
                            (d) [conduct any systematic or automated data
                            collection activities (including without limitation
                            scraping, data mining, data extraction and data
                            harvesting) on or in relation to our website without
                            our express written consent];
                            <br />
                            <br />
                            (e) [access or otherwise interact with our website
                            using any robot, spider or other automated means[,
                            except for the purpose of [search engine
                            indexing]]];
                            <br />
                            <br />
                            (f) [violate the directives set out in the
                            robots.txt file for our website]; or (g) [use data
                            collected from our website for any direct marketing
                            activity (including without limitation email
                            marketing, SMS marketing, telemarketing and direct
                            mailing)].
                          </div>
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You must not use data collected from our website to
                          contact individuals, companies or other persons or
                          entities.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You must ensure that all the information you supply to
                          us through our website, or in relation to our website,
                          is [true, accurate, current, complete and
                          non-misleading].
                        </li>
                      </ol>
                    </li>

                    <li className="StaticPage__div__container__discription__liStyling">
                      Registration and accounts
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You may register for an account with our website by
                          [completing and submitting the account registration
                          form on our website, and clicking on the verification
                          link in the email that the website will send to you].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You must not allow any other person to use your
                          account to access the website.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You must notify us in writing immediately if you
                          become aware of any unauthorised use of your account.
                        </li>
                        <li>
                          You must not use any other person's account to access
                          the website[, unless you have that person's express
                          permission to do so].
                        </li>
                      </ol>
                    </li>

                    <li className="StaticPage__div__container__discription__liStyling">
                      User login details
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          If you register for an account with our website, [we
                          will provide you with] OR [you will be asked to
                          choose] [a user ID and password].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Your user ID must not be liable to mislead; you must
                          not use your account or user ID for or in connection
                          with the impersonation of any person.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You must keep your password confidential.
                        </li>
                        <li>
                          You must notify us in writing immediately if you
                          become aware of any disclosure of your password.
                        </li>
                        <li>
                          You are responsible for any activity on our website
                          arising out of any failure to keep your password
                          confidential, and may be held liable for any losses
                          arising out of such a failure.
                        </li>
                      </ol>
                    </li>

                    <li className="StaticPage__div__container__discription__liStyling">
                      Cancellation and suspension of accoun
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We may:
                          <br />
                          <div className="StaticPage__div__container__discription__liStyling__alpha">
                            (a) [suspend your account]; <br />
                            <br />
                            (b) [cancel your account]; and/or <br />
                            <br />
                            (c) [edit your account details], <br />
                            <br />
                            at any time in our sole discretion without notice or
                            explanation.
                          </div>
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You may cancel your account on our website [using your
                          account control panel on the website].
                        </li>
                      </ol>
                    </li>

                    <li className="StaticPage__div__container__discription__liStyling">
                      Your content: licence
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          In these terms and conditions, "your content" means
                          [all works and materials (including without limitation
                          text, graphics, images, audio material, video
                          material, audio-visual material, scripts, software and
                          files) that you submit to us or our website for
                          storage or publication on, processing by, or
                          transmission via, our website].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You grant to us a [worldwide, irrevocable,
                          non-exclusive, royalty-free licence] to [use,
                          reproduce, store, adapt, publish, translate and
                          distribute your content in any existing or future
                          media] OR [reproduce, store and publish your content
                          on and in relation to this website and any successor
                          website] OR [reproduce, store and, with your specific
                          consent, publish your content on and in relation to
                          this website].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You hereby waive all your moral rights in your content
                          to the maximum extent permitted by applicable law; and
                          you warrant and represent that all other moral rights
                          in your content have been waived to the maximum extent
                          permitted by applicable law.
                        </li>
                        <li>
                          You may edit your content to the extent permitted
                          using the editing functionality made available on our
                          website.
                        </li>
                        <li>
                          Without prejudice to our other rights under these
                          terms and conditions, if you breach any provision of
                          these terms and conditions in any way, or if we
                          reasonably suspect that you have breached these terms
                          and conditions in any way, we may delete, unpublish or
                          edit any or all of your content.
                        </li>
                      </ol>
                    </li>

                    <li className="StaticPage__div__container__discription__liStyling">
                      Your content: rules
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You warrant and represent that your content will
                          comply with these terms and conditions.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Your content must not be illegal or unlawful, must not
                          infringe any person's legal rights, and must not be
                          capable of giving rise to legal action against any
                          person (in each case in any jurisdiction and under any
                          applicable law).
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Your content, and the use of your content by us in
                          accordance with these terms and conditions, must not:
                          <br />
                          <div className="StaticPage__div__container__discription__liStyling__alpha">
                            (a) be libellous or maliciously false;
                            <br />
                            <br />
                            (b) be obscene or indecent;
                            <br />
                            <br />
                            (c) infringe any copyright, moral right, database
                            right, trade mark right, design right, right in
                            passing off, or other intellectual property right;
                            <br />
                            <br />
                            (d) infringe any right of confidence, right of
                            privacy or right under data protection legislation;
                            <br />
                            <br />
                            (e) constitute negligent advice or contain any
                            negligent statement; <br />
                            <br />
                            (f) constitute an incitement to commit a crime[,
                            instructions for the commission of a crime or the
                            promotion of criminal activity]
                            <br />
                            <br />
                            (g) be in contempt of any court, or in breach of any
                            court order;
                            <br />
                            <br />
                            (h) be in breach of racial or religious hatred or
                            discrimination legislation;
                            <br />
                            <br />
                            (i) be blasphemous;
                            <br />
                            <br />
                            (j) be in breach of official secrets legislation;{" "}
                            <br />
                            <br />
                            (k) be in breach of any contractual obligation owed
                            to any person; <br />
                            <br />
                            (l) [depict violence[ in an explicit, graphic or
                            gratuitous manner]]; <br />
                            <br />
                            (m) [be pornographic[, lewd, suggestive or sexually
                            explicit]]; <br />
                            <br />
                            (n) [be untrue, false, inaccurate or misleading];{" "}
                            <br />
                            <br />
                            (o) [consist of or contain any instructions, advice
                            or other information which may be acted upon and
                            could, if acted upon, cause illness, injury or
                            death, or any other loss or damage]; <br />
                            <br />
                            (p) [constitute spam]; <br />
                            <br />
                            (q) [be offensive, deceptive, fraudulent,
                            threatening, abusive, harassing, anti-social,
                            menacing, hateful, discriminatory or inflammatory];
                            or <br />
                            <br />
                            (r) [cause annoyance, inconvenience or needless
                            anxiety to any person].
                          </div>
                        </li>
                      </ol>
                    </li>

                    <li className="StaticPage__div__container__discription__liStyling">
                      Limited warranties
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We do not warrant or represent:
                          <br />
                          <div className="StaticPage__div__container__discription__liStyling__alpha">
                            (a) the completeness or accuracy of the information
                            published on our website;
                            <br />
                            <br />
                            (b) that the material on the website is up to date;
                            or
                            <br />
                            <br />
                            (c) that the website or any service on the website
                            will remain available.
                          </div>
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We reserve the right to discontinue or alter any or
                          all of our website services, and to stop publishing
                          our website, at any time in our sole discretion
                          without notice or explanation; and save to the extent
                          expressly provided otherwise in these terms and
                          conditions, you will not be entitled to any
                          compensation or other payment upon the discontinuance
                          or alteration of any website services, or if we stop
                          publishing the website.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          To the maximum extent permitted by applicable law, we
                          exclude all representations and warranties relating to
                          the subject matter of these terms and conditions, our
                          website and the use of our website.
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Breaches of these terms and conditions
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Without prejudice to our other rights under these
                          terms and conditions, if you breach these terms and
                          conditions in any way, or if we reasonably suspect
                          that you have breached these terms and conditions in
                          any way, we may:
                          <br />
                          <div className="StaticPage__div__container__discription__liStyling__alpha">
                            (a) send you one or more formal warnings;
                            <br />
                            <br />
                            (b) temporarily suspend your access to our website;
                            <br />
                            <br />
                            (c) permanently prohibit you from accessing our
                            website;
                            <br />
                            <br />
                            (d) [block computers using your IP address from
                            accessing our website];
                            <br />
                            <br />
                            (e) [contact any or all of your internet service
                            providers and request that they block your access to
                            our website];
                            <br />
                            <br />
                            (f) commence legal action against you, whether for
                            breach of contract or otherwise; and/or
                            <br />
                            <br />
                            (g) [suspend or delete your account on our website].
                          </div>
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Where we suspend or prohibit or block your access to
                          our website or a part of our website, you must not
                          take any action to circumvent such suspension or
                          prohibition or blocking[ (including without limitation
                          [creating and/or using a different account])].
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Variation
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We may revise these terms and conditions from time to
                          time.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          [The revised terms and conditions shall apply to the
                          use of our website from the date of publication of the
                          revised terms and conditions on the website, and you
                          hereby waive any right you may otherwise have to be
                          notified of, or to consent to, revisions of these
                          terms and conditions.] OR [We will give you written
                          notice of any revision of these terms and conditions,
                          and the revised terms and conditions will apply to the
                          use of our website from the date that we give you such
                          notice; if you do not agree to the revised terms and
                          conditions, you must stop using our website.]
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          If you have given your express agreement to these
                          terms and conditions, we will ask for your express
                          agreement to any revision of these terms and
                          conditions; and if you do not give your express
                          agreement to the revised terms and conditions within
                          such period as we may specify, we will disable or
                          delete your account on the website, and you must stop
                          using the website
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Assignment
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You hereby agree that we may assign, transfer,
                          sub-contract or otherwise deal with our rights and/or
                          obligations under these terms and conditions.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          You may not without our prior written consent assign,
                          transfer, sub-contract or otherwise deal with any of
                          your rights and/or obligations under these terms and
                          conditions.
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Severability
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          If any unlawful and/or unenforceable provision of
                          these terms and conditions would be lawful or
                          enforceable if part of it were deleted, that part will
                          be deemed to be deleted, and the rest of the provision
                          will continue in effect.
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Third party rights
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          A contract under these terms and conditions is for our
                          benefit and your benefit, and is not intended to
                          benefit or be enforceable by any third party.
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          The exercise of the parties' rights under a contract
                          under these terms and conditions is not subject to the
                          consent of any third party.
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Entire agreement
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          The terms and conditions[, together with [our privacy
                          and cookies policy],] shall constitute the entire
                          agreement between you and us in relation to your use
                          of our website and shall supersede all previous
                          agreements between you and us in relation to your use
                          of our website.
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Law and jurisdictio
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          These terms and conditions shall be governed by and
                          construed in accordance with [Indian Law].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Any disputes relating to these terms and conditions
                          shall be subject to the [exclusive] OR [non-exclusive]
                          jurisdiction of the courts of [India].
                        </li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Statutory and regulatory disclosures
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We are registered in [trade register]; you can find
                          the online version of the register at [URL], and our
                          registration number is [number].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We are subject to [authorisation scheme], which is
                          supervised by [supervisory authority].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We are registered as [title] with [professional body]
                          in [the United Kingdom] and are subject to [rules],
                          which can be found at [URL].
                        </li>
                        <li>
                          We subscribe to [code(s) of conduct], which can be
                          consulted electronically at [URL(s)].
                        </li>
                        <li>Our GST number is [number].</li>
                      </ol>
                    </li>
                    <li className="StaticPage__div__container__discription__liStyling">
                      Our details
                      <ol>
                        <li className="StaticPage__div__container__discription__liStyling">
                          This website is owned and operated by [name]
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          We are registered in [England and Wales] under
                          registration number [number], and our registered
                          office is at [address].
                        </li>
                        <li className="StaticPage__div__container__discription__liStyling">
                          Our principal place of business is at [address]
                        </li>
                        <li>
                          You can contact us:
                          <br />
                          <div className="StaticPage__div__container__discription__liStyling__alpha">
                            (a) [by post, using the postal address [given
                            above]];
                            <br />
                            <br />
                            (b) [using our website contact form];
                            <br />
                            <br />
                            (c) [by telephone, on [the contact number published
                            on our website from time to time]]; or
                            <br />
                            <br />
                            (d) [by email, using [the email address published on
                            our website from time to time]].
                          </div>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </Typography>
              </div>
            </Paper>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default TermsCondition;

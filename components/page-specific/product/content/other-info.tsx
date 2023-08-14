import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useContext } from "react";
import { AccordionContext } from "react-bootstrap";
import IcAcordionPlus from "assets/icons/IcAcordionPlus";
import IcAcordionStrip from "assets/icons/IcAcordionStrip";

import IcHeart from "assets/icons/sections/product/IcHeart";
import IcShipping from "assets/icons/sections/product/IcShipping";
import IcStartEmpty from "assets/icons/sections/product/IcStartEmpty";

import StarRate from "components/shared/star-rate";

const OtherInfo = ({ product }) => {
  // Component Custom
  const ContextAwareToggle = ({
    children,
    eventKey,
    title = "",
    callback,
    Icon = IcHeart,
  }: any) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <div className="accordion__header">
        <div className="accordion__header__wrapper" onClick={decoratedOnClick}>
          <div className="accordion__header__title">
            <Icon />
            <h3>{title}</h3>
          </div>
          <span>
            {isCurrentEventKey ? <IcAcordionStrip /> : <IcAcordionPlus />}
          </span>
        </div>
        {children}
      </div>
    );
  };

  return (
    <section className="other-info">
      <Accordion flush className="other-info__accordion">
        <div className="accordion__item ">
          <ContextAwareToggle eventKey="0" title="DESCRIPTION" />
          <Accordion.Collapse eventKey="0">
            <div className="accordion__body accordion__description">
              <p
                dangerouslySetInnerHTML={{
                  __html: product.description || "",
                }}
              ></p>
            </div>
          </Accordion.Collapse>
        </div>
        <div className="accordion__item">
          <ContextAwareToggle
            eventKey="1"
            title="SHIPPING & RETURNS"
            Icon={IcShipping}
          />
          <Accordion.Collapse eventKey="1">
            <div className="accordion__body">
              <p>
                Meet your latest office upgrade. Un Blush Wish is inspired by
                the classic ballet flat - but here, it's enhanced with
                contemporary design details. A leather twist across the toe
                disrupts the usual profile, and a 2cm heel gives just enough
                everyday elevation.
              </p>
            </div>
          </Accordion.Collapse>
        </div>
        {/* <div className="accordion__item accordion__review">
          <ContextAwareToggle eventKey="2" title="REVIEWS" Icon={IcStartEmpty}>
            <div className="accordion__review__total">
              <div className="review__total__star">
                <StarRate rating={5} interactive={false} />
                <span>2 Reviews</span>
              </div>
              <button className="button button-red--underline">
                Write a Review
              </button>
            </div>
          </ContextAwareToggle>
          <Accordion.Collapse eventKey="2">
            <div className="accordion__body ">
              <div className="review__users">
                <div className="review__user">
                  <StarRate rating={5}  />

                  <h3>Beautiful!</h3>
                  <p className="user__name">
                    <span> Carol J.</span> on <span>Oct 02, 2022</span>
                  </p>
                  <p className="user__message">
                    Beautiful, classic, chic, stylish, durable, very child
                    friendly..wipe clean and the little bag is handy for
                    personal bits and bobs 😉
                  </p>
                </div>
              </div>
            </div>
          </Accordion.Collapse>
        </div> */}
      </Accordion>
    </section>
  );
};

export default OtherInfo;

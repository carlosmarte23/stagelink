import { Check } from "lucide-react";
import { CHECKOUT_STEP_STATUS } from "../../../features/checkout/config/checkoutStepsConfig.js";
import { getCheckoutStepStatus } from "../../../features/checkout/lib/checkoutSteps.js";

import styles from "./CheckoutTimeline.module.css";

export default function CheckoutTimeline({ checkoutSteps, activeStep }) {
  const isCurrent = (step) => step.id === activeStep;

  return (
    <nav aria-label="Checkout progress" className={styles.timeline}>
      <ol
        className={styles.steps}
        style={{ "--checkout-step-count": checkoutSteps.length }}
      >
        {checkoutSteps.map((step, index) => {
          const stepStatus = getCheckoutStepStatus(step.id, activeStep);

          return (
            <li
              key={step.id}
              data-status={stepStatus}
              aria-current={isCurrent(step) ? "step" : undefined}
              className={styles.step}
            >
              <div className={styles.icon} aria-hidden="true">
                {stepStatus === CHECKOUT_STEP_STATUS.COMPLETE ? (
                  <Check />
                ) : (
                  index + 1
                )}
              </div>

              <span className={styles.label}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

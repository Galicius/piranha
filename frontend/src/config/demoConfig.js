/**
 * Demo Site Configuration
 * 
 * This file centralizes all demo-related settings for the site.
 * When the site goes live, simply set enabled: false for both components
 * or remove this file entirely along with the component imports.
 */

export const demoConfig = {
  // Demo banner configuration
  watermark: {
    enabled: true,
    text: "Stran še ni aktivna - demo verzija",
    opacity: 0.03,
    fontSize: {
      mobile: "1.5rem",
      desktop: "2rem"
    }
  },
  
  // Developer promotion configuration
  promotion: {
    enabled: true,
    developerName: "Gal Guštin",
    tagline: "Full-Stack Web Developer",
    contactEmail: "galgustin@gmail.com", // Replace with your actual email
    message: "Ali ti je stran všeč?",
    callToAction: "Lahko jo ustvarim tudi za tebe!",
    buttonText: "Kontaktiraj me"
  }
};

/**
 * Validation function for demo configuration
 * @param {Object} config - Configuration object to validate
 * @returns {Object} Validated configuration with defaults
 */
export const validateDemoConfig = (config = demoConfig) => {
  const defaults = {
    watermark: {
      enabled: true,
      text: "Stran še ni aktivna - demo verzija",
      opacity: 0.03,
      fontSize: {
        mobile: "1.5rem",
        desktop: "2rem"
      }
    },
    promotion: {
      enabled: true,
      developerName: "Web Developer",
      tagline: "Professional Web Development",
      contactEmail: "",
      portfolioUrl: "",
      message: "Like this website?",
      callToAction: "I can create one for you too!",
      buttonText: "Contact Me"
    }
  };

  return {
    watermark: {
      ...defaults.watermark,
      ...config.watermark,
      fontSize: {
        ...defaults.watermark.fontSize,
        ...config.watermark?.fontSize
      }
    },
    promotion: {
      ...defaults.promotion,
      ...config.promotion
    }
  };
};

/**
 * Quick disable function for going live
 * Call this function to disable all demo features
 */
export const disableDemo = () => {
  return {
    ...demoConfig,
    watermark: { ...demoConfig.watermark, enabled: false },
    promotion: { ...demoConfig.promotion, enabled: false }
  };
};
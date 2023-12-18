export const Countries = [
  {CC: 'AED', CN: 'United Arab Emirates Dirham'},
  {CC: 'AMD', CN: 'Armenian Dram'},
  {CC: 'ANG', CN: 'Netherlands Antillean Guilder'},
  {CC: 'ARS', CN: 'Argentine Peso'},
  {CC: 'AUD', CN: 'Australian Dollar'},
  {CC: 'BAM', CN: 'Bosnia-Herzegovina Convertible Mark'},
  {CC: 'BDT', CN: 'Bangladeshi Taka'},
  {CC: 'BGN', CN: 'Bulgarian Lev'},
  {CC: 'BHD', CN: 'Bahraini Dinar'},
  {CC: 'BND', CN: 'Brunei Dollar'},
  {CC: 'BOB', CN: 'Bolivian Boliviano'},
  {CC: 'BRL', CN: 'Brazilian Real'},
  {CC: 'BWP', CN: 'Botswanan Pula'},
  {CC: 'BYN', CN: 'Belarusian Ruble'},
  {CC: 'CAD', CN: 'Canadian Dollar'},
  {CC: 'CHF', CN: 'Swiss Franc'},
  {CC: 'CLP', CN: 'Chilean Peso'},
  {CC: 'CNY', CN: 'Chinese Yuan'},
  {CC: 'COP', CN: 'Colombian Peso'},
  {CC: 'CRC', CN: 'Costa Rican Colón'},
  {CC: 'CZK', CN: 'Czech Koruna'},
  {CC: 'DKK', CN: 'Danish Krone'},
  {CC: 'DOP', CN: 'Dominican Peso'},
  {CC: 'DZD', CN: 'Algerian Dinar'},
  {CC: 'EGP', CN: 'Egyptian Pound'},
  {CC: 'EUR', CN: 'Euro'},
  {CC: 'FJD', CN: 'Fijian Dollar'},
  {CC: 'GBP', CN: 'British Pound Sterling'},
  {CC: 'GEL', CN: 'Georgian Lari'},
  {CC: 'GHS', CN: 'Ghanaian Cedi'},
  {CC: 'HKD', CN: 'Hong Kong Dollar'},
  {CC: 'HRK', CN: 'Croatian Kuna'},
  {CC: 'HUF', CN: 'Hungarian Forint'},
  {CC: 'IDR', CN: 'Indonesian Rupiah'},
  {CC: 'ILS', CN: 'Israeli New Sheqel'},
  {CC: 'INR', CN: 'Indian Rupee'},
  {CC: 'IQD', CN: 'Iraqi Dinar'},
  {CC: 'ISK', CN: 'Icelandic Króna'},
  {CC: 'JMD', CN: 'Jamaican Dollar'},
  {CC: 'JOD', CN: 'Jordanian Dinar'},
  {CC: 'JPY', CN: 'Japanese Yen'},
  {CC: 'KES', CN: 'Kenyan Shilling'},
  {CC: 'KRW', CN: 'South Korean Won'},
  {CC: 'KWD', CN: 'Kuwaiti Dinar'},
  {CC: 'KZT', CN: 'Kazakhstani Tenge'},
  {CC: 'LAK', CN: 'Laotian Kip'},
  {CC: 'LBP', CN: 'Lebanese Pound'},
  {CC: 'LKR', CN: 'Sri Lankan Rupee'},
  {CC: 'LTL', CN: 'Lithuanian Litas'},
  {CC: 'MAD', CN: 'Moroccan Dirham'},
  {CC: 'MMK', CN: 'Myanma Kyat'},
  {CC: 'MOP', CN: 'Macanese Pataca'},
  {CC: 'MUR', CN: 'Mauritian Rupee'},
  {CC: 'MXN', CN: 'Mexican Peso'},
  {CC: 'MYR', CN: 'Malaysian Ringgit'},
  {CC: 'NAD', CN: 'Namibian Dollar'},
  {CC: 'NGN', CN: 'Nigerian Naira'},
  {CC: 'NIO', CN: 'Nicaraguan Córdoba'},
  {CC: 'NOK', CN: 'Norwegian Krone'},
  {CC: 'NPR', CN: 'Nepalese Rupee'},
  {CC: 'NZD', CN: 'New Zealand Dollar'},
  {CC: 'OMR', CN: 'Omani Rial'},
  {CC: 'PAB', CN: 'Panamanian Balboa'},
  {CC: 'PEN', CN: 'Peruvian Nuevo Sol'},
  {CC: 'PHP', CN: 'Philippine Peso'},
  {CC: 'PKR', CN: 'Pakistani Rupee'},
  {CC: 'PLN', CN: 'Polish Zloty'},
  {CC: 'PYG', CN: 'Paraguayan Guarani'},
  {CC: 'QAR', CN: 'Qatari Rial'},
  {CC: 'RON', CN: 'Romanian Leu'},
  {CC: 'RSD', CN: 'Serbian Dinar'},
  {CC: 'RUB', CN: 'Russian Ruble'},
  {CC: 'SAR', CN: 'Saudi Riyal'},
  {CC: 'SEK', CN: 'Swedish Krona'},
  {CC: 'SGD', CN: 'Singapore Dollar'},
  {CC: 'SVC', CN: 'Salvadoran Colón'},
  {CC: 'THB', CN: 'Thai Baht'},
  {CC: 'TND', CN: 'Tunisian Dinar'},
  {CC: 'TRY', CN: 'Turkish Lira'},
  {CC: 'TWD', CN: 'New Taiwan Dollar'},
  {CC: 'TZS', CN: 'Tanzanian Shilling'},
  {CC: 'UAH', CN: 'Ukrainian Hryvnia'},
  {CC: 'UGX', CN: 'Ugandan Shilling'},
  {CC: 'USD', CN: 'US Dollar'},
  {CC: 'UYU', CN: 'Uruguayan Peso'},
  {CC: 'UZS', CN: 'Uzbekistan Som'},
  {CC: 'VES', CN: 'Venezuelan Bolívar'},
  {CC: 'VND', CN: 'Vietnamese Dong'},
  {CC: 'XCD', CN: 'East Caribbean Dollar'},
  {CC: 'XOF', CN: 'CFA Franc BCEAO'},
  {CC: 'XPF', CN: 'CFP Franc'},
  {CC: 'ZAR', CN: 'South African Rand'},
];

Countries.forEach(country => {
  country.FL = `https://flagsapi.com/${country.CC.substring(0, 2)}/flat/64.png`;
});

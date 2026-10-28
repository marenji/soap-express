module.exports = {
  ConversionesService: {
    ConversionesPort: {
      CelsiusAFahrenheit(args) {
        const c = Number(args.celsius);
        return { fahrenheit: c * 9 / 5 + 32 };
      },
      KilometrosAMillas(args) {
        const km = Number(args.kilometros);
        return { millas: Number((km * 0.621371).toFixed(5)) };
      }
    }
  }
};
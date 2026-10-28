module.exports = {
  GeometriaService: {
    GeometriaPort: {
      AreaRectangulo(args) {
        return { area: Number(args.base) * Number(args.altura) };
      },
      PerimetroRectangulo(args) {
        return { perimetro: 2 * (Number(args.base) + Number(args.altura)) };
      }
    }
  }
};
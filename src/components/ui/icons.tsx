// Компонент для використання SVG спрайту

interface IconProps {
  name: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Icon = ({ name, className, width = 32, height = 32 }: IconProps) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
};

// Експорт окремих іконок для зручності
export const LocationIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="map" width={20} height={20} {...props} />
);

export const StarIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="star" width={16} height={16} {...props} />
);

export const ACIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="ac" {...props} />
);

export const AutomaticIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="automatic" {...props} />
);

export const KitchenIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="kitchen" {...props} />
);

export const TVIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="tv" {...props} />
);

export const BathroomIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="bathroom" {...props} />
);

export const VanIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="van" {...props} />
);

export const FullyIntegratedIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="fully-integrated" {...props} />
);

export const AlcoveIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="alcove" {...props} />
);

export const PetrolIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="petrol" {...props} />
);

export const RefrigeratorIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="refrigerator" {...props} />
);

export const RadioIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="radio" {...props} />
);

export const MicrowaveIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="microwave" {...props} />
);

export const GasIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="gas" {...props} />
);

export const WaterIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="water" {...props} />
);

export const FavoriteIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="heart" {...props} />
);

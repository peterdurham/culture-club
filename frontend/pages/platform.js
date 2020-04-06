import User from "../components/User";

import Games from "../components/games/Games";
import { GamePlatforms } from "../config";

const PlatformPage = (props) => {
  const platforms = [props.query.platform];
  const platformTitles = GamePlatforms.map((platform) => platform.title);
  const platformValues = GamePlatforms.map((platform) => platform.value);

  const platformLabels = platforms.map((platform, index) => {
    const platformIndex = platformValues.indexOf(platform);
    return platformTitles[platformIndex];
  });

  return (
    <User>
      {({ data: { me } }) => {
        if (props.query.type === "game") {
          return (
            <Games
              filter="platform"
              platform={props.query.platform}
              platformLabel={platformLabels[0]}
              page={parseFloat(props.query.page) || 1}
              cardView={props.cardView}
              setCardView={props.setCardView}
            />
          );
        }
      }}
    </User>
  );
};

export default PlatformPage;

import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';

import { promiseToFlyTo, geoJsonToMarkers, clearMapLayers } from 'lib/map';
import { trackerLocationsToGeoJson, trackerFeatureToHtmlMarker } from 'lib/coronavirus';
import { useCoronavirusTracker } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

const LOCATION = {
  lat: 0,
  lng: 0
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 1;

const IndexPage = () => {
  const { data = [] } = useCoronavirusTracker({
    api: 'countries'
  });
  const hasData = Array.isArray(data) && data.length > 0;

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map || !hasData ) return;

    clearMapLayers({
      map,
      excludeByName: [ 'Mapbox' ]
    })

    const locationsGeoJson = trackerLocationsToGeoJson(data);

    const locationsGeoJsonLayers = geoJsonToMarkers(locationsGeoJson, {
      onClick: handleOnMarkerClick,
      featureToHtml: trackerFeatureToHtmlMarker
    });

    const bounds = locationsGeoJsonLayers.getBounds();

    locationsGeoJsonLayers.addTo(map);

    map.fitBounds(bounds);
  }

  function handleOnMarkerClick({ feature = {} } = {}, event = {}) {
    const { target = {} } = event;
    const { _map: map = {} } = target;

    const { geometry = {}, properties = {} } = feature;
    const { coordinates } = geometry;
    const { countryBounds, countryCode } = properties;

    promiseToFlyTo(map, {
      center: {
        lat: coordinates[1],
        lng: coordinates[0]
      },
      zoom: 3
    });

    if ( countryBounds && countryCode !== 'US' ) {
      const boundsGeoJsonLayer = new L.GeoJSON(countryBounds);
      const boundsGeoJsonLayerBounds = boundsGeoJsonLayer.getBounds();

      map.fitBounds(boundsGeoJsonLayerBounds);
    }
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'Mapbox',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings} />

      <Container type="content" className="text-center home-start">
        <h2>Demo Mapping App with Gatsby and React Leaflet</h2>
        <ul>
          <li>
            Uses <a href="https://github.com/ExpDev07/coronavirus-tracker-api">github.com/ExpDev07/coronavirus-tracker-api</a> via <a href="https://coronavirus-tracker-api.herokuapp.com/">coronavirus-tracker-api.herokuapp.com</a>
          </li>
          <li>
            Which uses jhu - <a href="https://github.com/CSSEGISandData/COVID-19">github.com/CSSEGISandData/COVID-19</a> - Worldwide Data repository operated by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).
          </li>
          <li>
            And csbs - <a href="https://www.csbs.org/information-covid-19-coronavirus">csbs.org/information-covid-19-coronavirus</a> - U.S. County data that comes from the Conference of State Bank Supervisors.
          </li>
        </ul>

        <h2>Want to build your own map?</h2>
        <p>
          Check out <a href="https://github.com/colbyfayock/gatsby-starter-leaflet">github.com/colbyfayock/gatsby-starter-leaflet</a>
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;

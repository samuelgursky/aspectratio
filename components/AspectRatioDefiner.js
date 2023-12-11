import React, { useState, useEffect } from 'react';

const AspectRatioDefiner = ({ onRatioChange, orientation }) => {
  const presets = {
    horizontal: {
      '2.39:1': { '4K': [4096, 1716], '2K': [2048, 858] },
      '2:1': { '4K': [4096, 2048], '2K': [2048, 1024] },
      '1.78:1': { '4K': [3840, 2160], '2K': [1920, 1080] },
      '1.33:1': { '4K': [2880, 2160], '2K': [1440, 1080] },
      '1:1': { '4K': [2160, 2160], '2K': [1080, 1080] },
      'Custom': [1, 1],
    },
    vertical: {
      '9:16': [1080, 1920],
      '4:5': [864, 1080],
      '1:1': [1080, 1080],
    },
  };

  // Ensure that orientation is valid, default to 'horizontal' if not
  const validOrientation = presets[orientation] ? orientation : 'horizontal';

  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2160);
  const [selectedPreset, setSelectedPreset] = useState('1.78:1');
  const [resolution, setResolution] = useState('4K');
  const isCustom = selectedPreset === 'Custom';

  useEffect(() => {
    if (!isCustom) {
      const presetValues = presets[validOrientation][selectedPreset];
      const [presetWidth, presetHeight] = Array.isArray(presetValues) ? presetValues : presetValues[resolution];
      setWidth(presetWidth);
      setHeight(presetHeight);
      onRatioChange(presetWidth / presetHeight);
    }
  }, [selectedPreset, resolution, isCustom, validOrientation]);

  const handleWidthHeightChange = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
    if (isCustom) {
      onRatioChange(parseFloat((newWidth / newHeight).toFixed(2)));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="preset" className="form-label">Aspect Ratio Preset</label>
          <select
            id="preset"
            name="preset"
            className="form-select"
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
          >
            {Object.keys(presets[validOrientation]).map((preset) => (
              <option key={preset} value={preset}>{preset}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          {isCustom ? (
            <div>
              <label htmlFor="customRatio" className="form-label">Custom Aspect Ratio</label>
              <input
                type="text"
                id="customRatio"
                className="form-control"
                value={`${(width / height).toFixed(2)}:1`}
                readOnly
                disabled
              />
            </div>
          ) : (
            <div>
              <label htmlFor="resolution" className="form-label">Resolution</label>
              <select
                id="resolution"
                name="resolution"
                className="form-select"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              >
                {['4K', '2K'].map((res) => (
                  <option key={res} value={res}>{res}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="width" className="form-label">Width</label>
          <input
            type="number"
            id="width"
            className={`form-control ${!isCustom ? 'disabled' : ''}`}
            value={width}
            onChange={(e) => handleWidthHeightChange(e.target.value, height)}
            disabled={!isCustom}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="height" className="form-label">Height</label>
          <input
            type="number"
            id="height"
            className={`form-control ${!isCustom ? 'disabled' : ''}`}
            value={height}
            onChange={(e) => handleWidthHeightChange(width, e.target.value)}
            disabled={!isCustom}
          />
        </div>
      </div>
    </div>
  );
};

export default AspectRatioDefiner;
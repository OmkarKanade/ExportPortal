{showForm && (
    <div className="modal">
        <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-left">
            <label htmlFor="toPuneFreight">To Pune Freight:</label>
                <input
                  type="number"
                  id="toPuneFreight"
                  name="toPuneFreight"
                  value={formData.toPuneFreight}
                  onChange={handleChange}
                />

                <label htmlFor="innerPackageMaterial">Inner Package Material:</label>
                <input
                  type="number"
                  id="innerPackageMaterial"
                  name="innerPackageMaterial"
                  value={formData.innerPackageMaterial}
                  onChange={handleChange}
                />

                <label htmlFor="outerPackageMaterial">Outer Package Material:</label>
                <input
                  type="number"
                  id="outerPackageMaterial"
                  name="outerPackageMaterial"
                  value={formData.outerPackageMaterial}
                  onChange={handleChange}
                />

                <label htmlFor="manualPackage">Manual Package:</label>
                <input
                  type="number"
                  id="manualPackage"
                  name="manualPackage"
                  value={formData.manualPackage}
                  onChange={handleChange}
                />
              </div>
              <div className="column">
                <label htmlFor="machinePackage">Machine Package:</label>
                <input
                  type="number"
                  id="machinePackage"
                  name="machinePackage"
                  value={formData.machinePackage}
                  onChange={handleChange}
                />

                <label htmlFor="localTransport">Local Transport:</label>
                <input
                  type="number"
                  id="localTransport"
                  name="localTransport"
                  value={formData.localTransport}
                  onChange={handleChange}
                />

                <label htmlFor="fumigation">Fumigation:</label>
                <input
                  type="number"
                  id="fumigation"
                  name="fumigation"
                  value={formData.fumigation}
                  onChange={handleChange}
                />

                <label htmlFor="totalRate">Total Rate:</label>
                <input
                  type="number"
                  id="totalRate"
                  name="totalRate"
                  value={formData.totalRate}
                  onChange={handleChange}
                />

                <label htmlFor="grossWeight">Gross Weight:</label>
                <input
                  type="number"
                  id="grossWeight"
                  name="grossWeight"
                  value={formData.grossWeight}
                  onChange={handleChange}
                />






                {/* Add more fields here */}
            </div>
            <div className="form-right">
                <label htmlFor="outerPackageMaterial">Outer Package Material:</label>
                <input
                    type="number"
                    id="outerPackageMaterial"
                    name="outerPackageMaterial"
                    value={formData.outerPackageMaterial}
                    onChange={handleChange}
                />

                <label htmlFor="manualPackage">Manual Package:</label>
                <input
                    type="number"
                    id="manualPackage"
                    name="manualPackage"
                    value={formData.manualPackage}
                    onChange={handleChange}
                />

                {/* Add more fields here */}
            </div>
            <div className="form-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
        </form>
    </div>
)}
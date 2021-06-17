<h4>Edit Labeler</h4>

<div class="add-TQE-form">
  <div class="mb-3">
    <label for="editUserID">UserID</label>
    <input type="text" class="form-control" id="editUserID" readonly>
  </div>  
  <div class="mb-3">
    <label for="corpEmailID">Corp Email</label>
    <input type="text" class="form-control" id="corpEmailID" readonly>
  </div>
  <div class="mb-3">
  <label for="editUserID">Username</label>
  <input type="text" class="form-control" id="editUserName">
  </div>
  <!-- <div class="mb-3">
    <label for="revLvlID">Review Level</label>
    <input type="text" class="form-control" id="revLvlID">
  </div> -->
  <div>
    <label for="addUserName">Review Level</label>
    <select class="form-select mb-3" id="addRevLevel">
    </select>
  </div>
  <button type="submit" class="btn btn-primary" id="save-changes">Save</button>
  <button type="submit" class="btn btn-primary" id="cancel-changes">Cancel Changes</button>
</div>

<div class="alert alert-success invisible mt-3" id="save-success-message" role="alert">
  Changes Saved!
</div>

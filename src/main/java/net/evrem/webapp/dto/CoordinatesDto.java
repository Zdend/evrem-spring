package net.evrem.webapp.dto;

import net.evrem.webapp.form.GridItemForm;

import java.util.List;


public class CoordinatesDto {

	private List<GridItemForm> gridItems;

	public List<GridItemForm> getGridItems() {
		return gridItems;
	}

	public void setGridItems(List<GridItemForm> gridItems) {
		this.gridItems = gridItems;
	}

}

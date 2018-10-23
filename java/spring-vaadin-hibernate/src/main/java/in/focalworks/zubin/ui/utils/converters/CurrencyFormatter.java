package in.focalworks.zubin.ui.utils.converters;

import com.vaadin.flow.templatemodel.ModelEncoder;
import in.focalworks.zubin.ui.dataproviders.DataProviderUtil;
import in.focalworks.zubin.ui.utils.FormattingUtils;

public class CurrencyFormatter implements ModelEncoder<Integer, String> {

	@Override
	public String encode(Integer modelValue) {
		return DataProviderUtil.convertIfNotNull(modelValue, FormattingUtils::formatAsCurrency);
	}

	@Override
	public Integer decode(String presentationValue) {
		throw new UnsupportedOperationException();
	}
}

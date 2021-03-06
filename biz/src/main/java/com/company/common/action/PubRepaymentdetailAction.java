package com.company.common.action;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.company.common.context.Constant;
import com.company.common.domain.PubRepaymentdetail;
import com.company.common.service.PubRepaymentdetailService;
import com.company.common.utils.JsonUtil;
import com.company.common.utils.ServletUtils;
import com.company.common.web.action.BaseAction;
import com.company.modules.common.exception.ServiceException;
import com.company.modules.system.domain.SysUser;

/**
 * User:    fzc
 * DateTime:2016-08-28 10:30:16
 * details: 放款,Action请求层
 * source:  代码生成器
 */
@RequestMapping("/modules/finance/PubRepaymentdetailAction")
@Controller
public class PubRepaymentdetailAction extends BaseAction {

    /**
     * 放款的Service
     */
	@Autowired
	private PubRepaymentdetailService pubRepaymentdetailService;

    /**
     * 放款表,插入数据
     * @param request	页面的request
     * @param response	页面的response
     * @param pubRepaymentdetail	页面参数
     * @throws Exception
     */
    @RequestMapping("/saveOrUpdatePubRepaymentdetail.htm")
    public void saveOrUpdatePubRepaymentdetail(HttpServletRequest request, HttpServletResponse response, 
    	@RequestParam(value = "pubRepaymentdetail", required = false) String pubRepaymentdetail, @RequestParam(value = "status", required = false) String status) throws Exception {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		long influence = 0;
		SysUser sysUser = this.getLoginUser(request);
		PubRepaymentdetail pubRepaymentdetailInfo = new PubRepaymentdetail();
		// 对json对象进行转换
		if (!StringUtils.isEmpty(pubRepaymentdetail)) {
			pubRepaymentdetailInfo = JsonUtil.parse(pubRepaymentdetail, PubRepaymentdetail.class);
		}
		if (status.equals("create")) {
			//如果表中有创建者   取当前登录人
			pubRepaymentdetailInfo.setCreator(sysUser.getId());
			pubRepaymentdetailInfo.setCreateTime(new Date());
			influence = pubRepaymentdetailService.insert(pubRepaymentdetailInfo);
		} else {
			//如果表中有修改者   取当前登录人
			pubRepaymentdetailInfo.setModifier(sysUser.getId());
			pubRepaymentdetailInfo.setModifyTime(new Date());
			influence = pubRepaymentdetailService.update(pubRepaymentdetailInfo);
		}
		if (influence > 0) {
			returnMap.put(Constant.RESPONSE_CODE, Constant.SUCCEED_CODE_VALUE);
			returnMap.put(Constant.RESPONSE_CODE_MSG, Constant.OPERATION_SUCCESS);
		} else {
			returnMap.put(Constant.RESPONSE_CODE, Constant.FAIL_CODE_VALUE);
			returnMap.put(Constant.RESPONSE_CODE_MSG, Constant.OPERATION_FAIL);
		}
		ServletUtils.writeToResponse(response, returnMap);
    }

    /**
     * 分页查询数据
     * @param request      页面的request
     * @param response      页面的response
     * @param currentPage   当前页数
     * @param pageSize      每页限制
     * @param searchParams   查询条件
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/getPubRepaymentdetailList.htm")
    public void getPubRepaymentdetailList(HttpServletResponse response, HttpServletRequest request,
		@RequestParam(value = "currentPage") Integer currentPage,
		@RequestParam(value = "pageSize") Integer pageSize,
  		@RequestParam(value = "searchParams", required = false) String searchParams) throws Exception{
        // 返回给页面的Map
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> paramap = new HashMap<>();
		//对json对象进行转换
        if (!StringUtils.isEmpty(searchParams)){
         	paramap = JsonUtil.parse(searchParams, Map.class);
        }
        PageHelper.startPage(currentPage, pageSize);
		List<PubRepaymentdetail> pubRepaymentdetails = pubRepaymentdetailService.getPageListByMap(paramap);
		PageInfo<PubRepaymentdetail> page = new PageInfo<PubRepaymentdetail>(pubRepaymentdetails);
		returnMap.put(Constant.RESPONSE_DATA, page.getList());
		returnMap.put(Constant.RESPONSE_DATA_TOTALCOUNT, page.getTotal());
		returnMap.put(Constant.RESPONSE_CODE, Constant.SUCCEED_CODE_VALUE);
		returnMap.put(Constant.RESPONSE_CODE_MSG, Constant.OPERATION_SUCCESS);
		// 返回给页面
		ServletUtils.writeToResponse(response, returnMap);
    }
    
    /**
    * 根据id删除数据
    * @param response    页面的response
    * @param id          主键
    * @throws ServiceException
    */
    @RequestMapping("/deleteById.htm")
    public void deleteById(HttpServletResponse response, @RequestParam(value = "id") long id) throws Exception{
    	Map<String, Object> returnMap = new HashMap<String, Object>();
		long influence = pubRepaymentdetailService.deleteById(id);
		if(influence > 0){
			returnMap.put(Constant.RESPONSE_CODE, Constant.SUCCEED_CODE_VALUE);
			returnMap.put(Constant.RESPONSE_CODE_MSG, Constant.OPERATION_SUCCESS);
		}else{
			returnMap.put(Constant.RESPONSE_CODE, Constant.FAIL_CODE_VALUE);
			returnMap.put(Constant.RESPONSE_CODE_MSG, Constant.OPERATION_FAIL);
		}
		//返回给页面
		ServletUtils.writeToResponse(response, returnMap);
    }
}
